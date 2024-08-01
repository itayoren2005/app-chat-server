import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Messages } from './Messages';
import { Group } from './Group';

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

  @ManyToMany(() => Group)
  @JoinTable()
  group: Group[];//////////probebly a mistake because i changed it only here //////
}