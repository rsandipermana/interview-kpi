import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Email or username',
  })
  emailOrUsername: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'User password',
  })
  password: string;
}
