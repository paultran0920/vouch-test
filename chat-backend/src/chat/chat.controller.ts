import { Body, Controller, Delete, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatJoinReqDTO } from './types/chat.types';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) { }

  @Post('join')
  async joinChat(@Body() data: ChatJoinReqDTO) {
    try {
      return await this.chatService.joinChat(data);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('leave')
  async leaveChat(@Body() data: ChatJoinReqDTO) {
    try {
      return await this.chatService.leaveChat(data);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('clean')
  async cleanData() {
    try {
      return await this.chatService.cleanData();
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
