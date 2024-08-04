export class CreateGroupDto {
  name: string;
  avatar: string;
  users: { id: number }[];
}