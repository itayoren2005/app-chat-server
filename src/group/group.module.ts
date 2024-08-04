import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/typeorm/entities/Group';
import { User } from 'src/typeorm/entities/User';


@Module({
  imports:[TypeOrmModule.forFeature([Group , User])],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
