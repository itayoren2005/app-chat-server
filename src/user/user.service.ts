import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({ where: { username: createUserDto.username } });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }
    const user = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user);
    return { id: savedUser.id };
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({where:{id}}) ;
  }

   async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if(!user)
    {
      throw new NotFoundException();
    }
    Object.assign(user,updateUserDto); 
    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if(!user)
    {
      throw new NotFoundException();
    }
    return await this.userRepository.remove(user);
  }
}
