import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';

@WebSocketGateway(8001, { cors: '*' })
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private messagesService: MessagesService) {}

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() createMessageDto: CreateMessageDto): Promise<void> {
    const savedMessage = await this.messagesService.create(createMessageDto);
    this.server.emit('message', savedMessage);
  }
}