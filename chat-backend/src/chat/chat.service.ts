import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatJoinReqDTO, ChatTopic, Message, ChatUserInfo, UserStatus, ChatNewUserEventBody, ChatNewMessageEventBody } from './types/chat.types';
import { Server, Socket } from 'socket.io';

@Injectable()
export class ChatService {
  private readonly logger: Logger = new Logger(ChatService.name);

  constructor(
    @InjectModel('Message') private readonly messageModel: Model<Message>,
    @InjectModel('ChatUserInfo') private readonly chatUserInfoModel: Model<ChatUserInfo>,
  ) { }

  async joinChat(data: ChatJoinReqDTO) {
    this.logger.debug(`Looking for the joined user name`);

    const existingUser = await this.chatUserInfoModel.findOne({
      username: data.username,
      roomId: data.roomId,
      status: UserStatus.Joined
    });

    if (existingUser) {
      throw new Error(`Username ${data.username} already existed in the room ${data.roomId}.`);
    }

    this.logger.debug(`${data.username} is OK to join ${data.roomId}`);
    return 'OK'
  }

  async leaveChat(data: ChatJoinReqDTO) {
    this.logger.debug(`Removing user name ${data.username} from room ${data.roomId}`);

    const existingUser = await this.chatUserInfoModel.findOneAndDelete({
      username: data.username,
      roomId: data.roomId,
      status: UserStatus.Joined
    });

    if (existingUser) {
      return `User ${existingUser.username} is removed from group ${existingUser.roomId}`;
    } else {
      throw new Error(`There is no user name ${data.username} in room ${data.roomId}`);
    }
  }

  async cleanData() {
    await this.messageModel.deleteMany();
    await this.chatUserInfoModel.deleteMany();
  }

  async notifyNewUser(eventBody: ChatNewUserEventBody, server: Server, client: Socket) {
    const existingUser = await this.chatUserInfoModel.findOne({
      username: eventBody.username,
      roomId: eventBody.roomId,
      status: UserStatus.Joined
    });

    if (existingUser) {
      throw new Error(`Username ${eventBody.username} already existed in the room ${eventBody.roomId}.`);
    }

    // Join the user to the room
    this.logger.debug(`User ${eventBody.username} is joining room ${eventBody.roomId}`);
    await client.join(eventBody.roomId);

    // Saving to DB
    this.logger.debug(`Change ${eventBody.username} to Joined.`);
    const newUserInfo = new this.chatUserInfoModel({
      ...eventBody,
      clientId: client.id,
      status: UserStatus.Joined
    });
    newUserInfo.save();

    // Notify others about the new user
    this.logger.debug(`Notifying other users that ${eventBody.username} just joined the room.`);
    server.sockets.to(eventBody.roomId).emit(ChatTopic.ChatUserJoined, {
      username: eventBody.username,
    });

    // Return existing messages
    this.logger.debug(`Loading existing messsages.`);
    const messages = await this.messageModel.find({ roomId: eventBody.roomId });
    return messages
  }

  async removeUserFromRoom(client: Socket) {
    this.logger.debug(`Checking for client ${client.id} joined status.`);
    const existingUser = await this.chatUserInfoModel.findOne({
      clientId: client.id,
      status: UserStatus.Joined
    });

    if (existingUser) {
      this.logger.debug(`Removing client ${client.id} with user name ${existingUser.username} from room ${existingUser.roomId}`);
      existingUser.deleteOne();
      client.leave(existingUser.roomId);

      return `User ${existingUser.username} is removed from group ${existingUser.roomId}`;
    } else {
      this.logger.debug(`There is no information for client ${client.id} in database.`);
    }
  }

  async sendMessage(eventBody: ChatNewMessageEventBody, server: Server) {
    this.logger.debug(`Saving message from user ${eventBody.username} in room ${eventBody.roomId} to database.`);
    const newMessage = new this.messageModel(eventBody);
    await newMessage.save();

    this.logger.debug(`Notifying message from user ${eventBody.username} to room.`);
    server.sockets.to(eventBody.roomId).emit(ChatTopic.ChatNewMessage, newMessage);

    return newMessage;
  }
}
