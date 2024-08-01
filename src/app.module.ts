import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { Group } from './typeorm/entities/Group';
import { Messages } from './typeorm/entities/Messages';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { MessagesModule } from './messages/messages.module';
import { UserGroupModule } from './user-group/user-group.module';

@Module({
  imports: [
    UserModule,
    GroupModule,
    MessagesModule,
    UserGroupModule,
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
    TypeOrmModule.forFeature([User , Group , Messages]),
    UserGroupModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
