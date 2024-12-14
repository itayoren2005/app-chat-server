import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './group/entities/Group';
import { Messages } from './messages/entities/Messages';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { MessagesModule } from './messages/messages.module';
import { User } from './user/entities/User';

@Module({
  imports: [
    UserModule,
    GroupModule,
    MessagesModule,
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: 'localhost',
      port: 5432, 
      username: 'postgres',
      password: 'root',
      database: 'app_chat',
      entities: [User,Group,Messages],
      synchronize: true,
    }),    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
