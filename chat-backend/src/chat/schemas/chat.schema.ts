import * as mongoose from 'mongoose';

export const MessageSchema = new mongoose.Schema({
  username: String,
  roomId: String,
  text: String,
  timestamp: { type: Date, default: Date.now },
});

export const ChatUserInfoSchema = new mongoose.Schema({
  username: String,
  roomId: String,
  status: String,
  clientId: String,
  timestamp: { type: Date, default: Date.now }
});
