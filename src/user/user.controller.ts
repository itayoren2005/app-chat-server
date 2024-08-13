import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginData: { username: string; password: string }) {
    return await this.userService.validateUser(
      loginData.username,
      loginData.password,
    );
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  @Get('/getUsername/:id')
  findOnesUsername(@Param('id') id: string) {
    return this.userService.findOnesUsername(+id);
  }
  @Get('/getAvatar/:id')
  findOnesAvatar(@Param('id') id: string) {
    return this.userService.findOnesAvatar(+id);
  }
}
