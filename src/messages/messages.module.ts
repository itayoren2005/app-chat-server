import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages } from 'src/typeorm/entities/Messages';


@Module({
  imports:[TypeOrmModule.forFeature([Messages])],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
