import { OmitType } from '@nestjs/swagger';
import { User } from '../schemas/user.schema';

export class UserDto extends OmitType(User, [
  '_id',
  'createdAt',
  'updatedAt',
] as const) {}
