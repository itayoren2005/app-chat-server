import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Messages } from '../../messages/entities/Messages';
import { User } from 'src/user/entities/User';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @OneToMany(() => Messages, (messeges) => messeges.group)
  messeges: Messages[];

  @ManyToMany(() => User, (user) => user.groups)
  @JoinTable()
  users:User[];

  
}