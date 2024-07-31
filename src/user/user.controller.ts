import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const result = await this.userService.create(createUserDto);
      return result;
    } catch (error) {
      if (error instanceof ConflictException) {//check 
        throw new ConflictException('Username already exists');
      }
      throw error;
    }
  }

  @Post('login')
  async login(@Body() loginData: { username: string; password: string }) {
    const user = await this.userService.validateUser(loginData.username, loginData.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { id: user.id };
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
