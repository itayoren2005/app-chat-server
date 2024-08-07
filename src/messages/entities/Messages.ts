import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Group } from '../../group/entities/Group';
import { User } from 'src/user/entities/User';

@Entity()
export class Messages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  data: string;

  @Column()
  time: string;

  @ManyToOne(() => User, (user) => user.messeges)
  user: User;

  @ManyToOne(() => Group, (group) => group.messeges)
  group: Group;
}