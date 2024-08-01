import { Controller, Post, Get, Delete, Param } from '@nestjs/common';
import { UserGroupService } from './user-group.service';

@Controller('user-group')
export class UserGroupController {
  constructor(private userGroupService: UserGroupService) {}

  @Post(':userId/group/:groupId')//join group
  async addUserToGroup(@Param('userId') userId: number, @Param('groupId') groupId: number) {
    await this.userGroupService.addUserToGroup(userId, groupId);
    return { message: 'User added to group successfully' };
  }

  @Get('user/:userId/groups')
  async getGroupsForUser(@Param('userId') userId: number) {
    return this.userGroupService.getGroupsForUser(userId);
  }

  @Get('group/:groupId/users')
  async getUsersInGroup(@Param('groupId') groupId: number) {
    return this.userGroupService.getUsersInGroup(groupId);
  }

  @Delete(':userId/group/:groupId')
  async removeUserFromGroup(@Param('userId') userId: number, @Param('groupId') groupId: number) {
    await this.userGroupService.removeUserFromGroup(userId, groupId);
    return { message: 'User removed from group successfully' };
  }
}