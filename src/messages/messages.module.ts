import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages } from 'src/typeorm/entities/Messages';
import { MessagesGateway } from './messages.gateway';
import { User } from 'src/typeorm/entities/User';
import { Group } from 'src/typeorm/entities/Group';


@Module({
  imports:[TypeOrmModule.forFeature([Messages , User , Group])],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesGateway],
})
export class MessagesModule {}
