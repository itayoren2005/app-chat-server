import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/group/entities/Group';
import { User } from './entities/User';

@Module({
  imports:[TypeOrmModule.forFeature([User,Group])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
