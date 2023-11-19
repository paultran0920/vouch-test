import { Document } from 'mongoose';

export enum UserStatus {
  Joined = "joined",
  NotJoined = "not joined"
}

export interface ChatUserInfo extends Document {
  username: string;
  roomId: string;
  status: UserStatus;
  clientId: string;
  timestamp: Date;
}

export interface Message extends Document {
  username: string;
  roomId: string;
  text: string;
  timestamp: Date;
}

export type ChatNewMessageEventBody = {
  username: string;
  roomId: string;
  text: string;
}

export type ChatNewUserEventBody = {
  username: string;
  roomId: string;
}

export type ChatJoinReqDTO = {
  username: string;
  roomId: string;
}

export enum ChatTopic {
  ChatNewUser = "chat-new-user",
  ChatNewMessage = "chat-new-message",
  ChatUserJoined = "chat-user-joined",
  ChatMessages = "chat-messages"
}
