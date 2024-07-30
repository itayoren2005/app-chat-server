import { Injectable , NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Messages } from 'src/typeorm/entities/Messages';


@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Messages)
    private readonly messagesRepository: Repository<Messages>,
  ) {}
  async create(CreateMessageDto: CreateMessageDto) {
    const message = this.messagesRepository.create(CreateMessageDto);
       return await this.messagesRepository.save(message);
  }

  async findAll() {
    return await this.messagesRepository.find();
  }

  async findOne(id: number) {
    return await this.messagesRepository.findOne({where:{id}}) ;
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
