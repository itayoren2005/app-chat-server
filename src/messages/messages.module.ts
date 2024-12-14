import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesGateway } from './messages.gateway';
import { Group } from 'src/group/entities/Group';
import { User } from 'src/user/entities/User';
import { Messages } from './entities/Messages';


@Module({
  imports:[TypeOrmModule.forFeature([Messages , User , Group])],
  providers: [MessagesService, MessagesGateway],
})
export class MessagesModule {}
