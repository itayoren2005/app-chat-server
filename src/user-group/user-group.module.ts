import { Module } from '@nestjs/common';
import { UserGroupService } from './user-group.service';
import { UserGroupController } from './user-group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Group } from 'src/typeorm/entities/Group';


@Module({
  imports: [
    TypeOrmModule.forFeature([User, Group]),
  ],
  controllers: [UserGroupController],
  providers: [UserGroupService],
})
export class UserGroupModule {}
