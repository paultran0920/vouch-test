import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat/chat.service';
import { ChatNewMessageEventBody, ChatNewUserEventBody, ChatTopic } from './chat/types/chat.types';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger(AppGateway.name)

  constructor(
    private chatService: ChatService
  ) { }

  afterInit(server: Server) {
    this.logger.debug('afterInit Initialized');
  }

  async handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    return await this.chatService.removeUserFromRoom(client)
  }

  @SubscribeMessage(ChatTopic.ChatNewMessage)
  async handleEventNewMessage(@MessageBody() eventBody: ChatNewMessageEventBody, @ConnectedSocket() client: Socket) {
    this.logger.debug(`Client ID: ${client.id} is sending event new message: ${JSON.stringify(eventBody)}`);

    try {
      return await this.chatService.sendMessage(eventBody, this.server);
    } catch (error: any) {
      this.logger.debug(error.message);
      throw new WsException({ message: error.message, statusCode: 400 });
    }
  }

  @SubscribeMessage(ChatTopic.ChatNewUser)
  async handleEventUserJoin(@MessageBody() eventBody: ChatNewUserEventBody, @ConnectedSocket() client: Socket) {
    this.logger.debug(`Client ID: ${client.id} is sending event New User: ${JSON.stringify(eventBody)}`);

    try {
      return await this.chatService.notifyNewUser(eventBody, this.server, client);
    } catch (error: any) {
      this.logger.debug(error.message);
      throw new WsException({ message: error.message, statusCode: 400 });
    }
  }
}
