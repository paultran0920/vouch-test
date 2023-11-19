import { Logger, Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatUserInfoSchema, MessageSchema } from './schemas/chat.schema';
import { AppGateway } from 'src/app.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }, { name: 'ChatUserInfo', schema: ChatUserInfoSchema }]),
  ],
  controllers: [ChatController],
  providers: [ChatService, AppGateway],
})

export class ChatModule {
  
  private logger: Logger = new Logger(ChatModule.name);

  constructor() {
    this.logger.debug('Chat module starting...')
  }
}
