import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/typeorm/entities/Group';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';


@Injectable()
export class UserGroupService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  async addUserToGroup(userId: number, groupId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['group'] });
    const group = await this.groupRepository.findOne({ where: { id: groupId } });

    if (user && group) {
      if (!user.group) {
        user.group = [];
      }
      user.group.push(group);
      await this.userRepository.save(user);
    }
  }

  async getGroupsForUser(userId: number): Promise<Group[]> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['group'] });
    return user ? user.group : [];
  }

  async getUsersInGroup(groupId: number): Promise<User[]> {
    return this.userRepository.createQueryBuilder('user')
      .innerJoin('user.group', 'group')
      .where('group.id = :groupId', { groupId })
      .getMany();
  }

  async removeUserFromGroup(userId: number, groupId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['group'] });

    if (user && user.group) {
      user.group = user.group.filter(group => group.id !== groupId);
      await this.userRepository.save(user);
    }
  }
}