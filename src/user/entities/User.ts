import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Messages } from 'src/messages/entities/Messages';
import { Group } from 'src/group/entities/Group';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @OneToMany(() => Messages, (messeges) => messeges.user)
  messeges: Messages[];

  @ManyToMany(() => Group, (group) => group.users)
  groups:Group[];

}