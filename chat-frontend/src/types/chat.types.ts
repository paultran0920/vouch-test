export enum UserStatus {
  Joined = "joined",
  NotJoined = "not joined"
}

export type ChatMessage = {
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

export type ChatJoinEventBody = {
  username: string;
  roomId: string;
}

export enum ChatTopic {
  ChatNewUser = "chat-new-user",
  ChatNewMessage = "chat-new-message",
  ChatUserJoined = "chat-user-joined",
  ChatError = "connect_error"
}
