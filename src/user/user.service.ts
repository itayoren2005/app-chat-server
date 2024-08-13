import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/User';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }
    const user = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user);
    return { id: savedUser.id };
  }

  async validateUser(username: string, password: string): Promise<number> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && user.password === password) {
      return user.id;
    } else throw new UnauthorizedException('Invalid credentials');
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }
  async findOnesUsername(id: number) {
    return (await this.userRepository.findOne({ where: { id } })).username;
  }
  async findOnesAvatar(id: number) {
    return (await this.userRepository.findOne({ where: { id } })).avatar;
  }
}
