import { Body, Controller, Post } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserDto } from 'src/entities/dto/create-user.dto';
import { LoginDto } from 'src/entities/dto/login.dto';
import { User } from 'src/entities/schemas/user.schema';
import { handleValidationError } from 'src/utils/validation.helper';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.authService.validateUserByEmailOrUsername(
      loginDto.emailOrUsername,
      loginDto.password,
    );
    const accessToken = await this.authService.login(user);
    return accessToken;
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const validationErrors = await validate(createUserDto);
    if (validationErrors.length > 0) {
      handleValidationError(validationErrors);
    }

    const user = plainToClass(User, createUserDto);
    const createdUser = await this.authService.register(user);
    return createdUser;
  }
}
