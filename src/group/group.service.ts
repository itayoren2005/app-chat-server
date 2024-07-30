import { Injectable , NotFoundException} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from 'src/typeorm/entities/Group';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async create(CreateGroupDto: CreateGroupDto) {
    const group = this.groupRepository.create(CreateGroupDto);
       return await this.groupRepository.save(group);
  }

  async findAll() {
    return await this.groupRepository.find();
  }

  async findOne(id: number) {
    return await this.groupRepository.findOne({where:{id}}) ;
  }

   async update(id: number, UpdateGroupDto: UpdateGroupDto) {
    const group = await this.findOne(id);
    if(!group)
    {
      throw new NotFoundException();
    }
    Object.assign(group,UpdateGroupDto); 
    return await this.groupRepository.save(group);
  }

  async remove(id: number) {
    const group = await this.findOne(id);
    if(!group)
    {
      throw new NotFoundException();
    }
    return await this.groupRepository.remove(group);
  }
}
