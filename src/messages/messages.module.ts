import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesGateway } from './messages.gateway';
import { Group } from 'src/group/entities/Group';
import { User } from 'src/user/entities/User';
import { Messages } from './entities/Messages';


@Module({
  imports:[TypeOrmModule.forFeature([Messages , User , Group])],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesGateway],
})
export class MessagesModule {}
