import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToMany,
    JoinTable,
  } from 'typeorm';
  import { Messages } from './Messages';
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    username: string;
  
    @Column()
    password: string;
  
    @Column()
    avatar: string;
  
    @OneToMany(() => Messages, (messeges) => messeges.user)
    messeges: Messages[];
  }