import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Group } from 'src/typeorm/entities/Group';

@Module({
  imports:[TypeOrmModule.forFeature([User,Group])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
