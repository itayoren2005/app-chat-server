import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/Group';
import { User } from 'src/user/entities/User';
import { In } from 'typeorm';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    const group = this.groupRepository.create(createGroupDto);

    if (createGroupDto.users.length > 0) {
      const userIds = createGroupDto.users;
      const users = await this.userRepository.findBy({ id: In(userIds) });
      group.users = users;
    }
    return await this.groupRepository.save(group);
  }

  async findAll() {
    return await this.groupRepository.find();
  }

  async findOne(id: number) {
    return await this.groupRepository.findOne({ where: { id } });
  }
  async findName(id: number) {
    const group = await this.groupRepository.findOne({ where: { id } });
    return group.name;
  }
  async findMembers(id: number) {
    const group = await this.groupRepository.findOne({
      where: { id },
      relations: ['users'],
    });
    if (!group) {
      throw new Error(`Group with ID ${id} not found`);
    }
    const memberIds = group.users.map((user) => user.id);
    const members = await this.userRepository.find({
      where: {
        id: In(memberIds),
      },
    });
    return members;
  }
  async addUserToGroup(groupId: number, userId: number): Promise<void> {
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
      relations: ['users'],
    });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!group || !user) {
      throw new NotFoundException('Group or User not found');
    }

    if (!group.users.some((user) => user.id === userId)) {
      group.users.push(user);
      await this.groupRepository.save(group);
    }
  }

  async getGroupsForUser(userId: number): Promise<Group[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['groups'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.groups;
  }
}
