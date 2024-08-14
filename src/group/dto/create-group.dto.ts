export class CreateGroupDto {
  name: string;
  avatar: string;
  isPrivate: boolean;
  users: { id: number }[];
}
