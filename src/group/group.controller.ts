import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }
  @Get('name/:id')
  findName(@Param('id') id: string) {
    return this.groupService.findName(+id);
  }
  @Get('members/:id')
  findMembers(@Param('id') id: string) {
    return this.groupService.findMembers(+id);
  }
  @Get('private/:id')
  findPrivate(@Param('id') id: string) {
    return this.groupService.findPrivate(+id);
  }

  @Post(':groupId/join')
  async joinGroup(
    @Param('groupId') groupId: string,
    @Body('userId') userId: number,
  ) {
    await this.groupService.addUserToGroup(+groupId, userId);
    return { message: 'User added to group successfully' };
  }

  @Get('user/:userId')
  async getUserGroups(@Param('userId') userId: string) {
    return this.groupService.getGroupsForUser(+userId);
  }
}
