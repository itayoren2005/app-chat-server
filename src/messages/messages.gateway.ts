import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';

@WebSocketGateway(8001, { cors: '*' })
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private messagesService: MessagesService) {}

  @SubscribeMessage('join-group')
  async handleJoinGroup(@MessageBody() groupId: number, @ConnectedSocket() client: Socket): Promise<void> {
    client.join(`group-${groupId}`);
    const messages = await this.messagesService.findAllByGroup(groupId);
    client.emit('initial-messages', messages);
  }

  @SubscribeMessage('message-send')
  async handleMessage(@MessageBody() createMessageDto: CreateMessageDto): Promise<void> {
    const savedMessage = await this.messagesService.create(createMessageDto);
    this.server.to(`group-${createMessageDto.groupId}`).emit('message-recive', savedMessage);
  }
}