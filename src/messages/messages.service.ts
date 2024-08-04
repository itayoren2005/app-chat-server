import { Injectable , NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Messages } from 'src/typeorm/entities/Messages';
import { User } from 'src/typeorm/entities/User';
import { Group } from 'src/typeorm/entities/Group';


type RecivedMessage={
  data: string;
  time: string;
  date: Date;
  user: User;
  group: Group;
};


@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Messages)
    private readonly messagesRepository: Repository<Messages>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const user = await this.userRepository.findOne({ where: { id: createMessageDto.userId } });
    const group = await this.groupRepository.findOne({ where: { id: createMessageDto.groupId } });

    if (!user || !group) {
      throw new NotFoundException('User or Group not found');
    }

    const message = this.messagesRepository.create({
      data: createMessageDto.content,
      time: createMessageDto.time,
      date: createMessageDto.date,
      user,
      group,
    });

    return await this.messagesRepository.save(message);
  }

  async findAllByGroup(groupId: number) {
    return await this.messagesRepository.find({
      where: { group: { id: groupId } },
      relations: ['user', 'group'],
      order: { date: 'ASC' },
    });
  }

  async findAll() {
    return await this.messagesRepository.find();
  }

  async findOne(id: number) {
    return await this.messagesRepository.findOne({where:{id}}) ;
  }

  async findOneMessage(user: User, group: Group): Promise<Messages | null> {
    return this.messagesRepository.findOne({ where: { user, group } });
  }

   async update(id: number, updatemessageDto: UpdateMessageDto) {
    const message = await this.findOne(id);
    if(!message)
    {
      throw new NotFoundException();
    }
    Object.assign(message,updatemessageDto); 
    return await this.messagesRepository.save(message);
  }

  async remove(id: number) {
    const message = await this.findOne(id);
    if(!message)
    {
      throw new NotFoundException();
    }
    return await this.messagesRepository.remove(message);
  }
}
