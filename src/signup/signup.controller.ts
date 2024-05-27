import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService, User } from '../users/users.service';
import { CreateUserDto } from './create_user.dto';

@Controller('auth/signup')
export class SignupController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      // Log the error
      console.error('Error in SignupController:', error);
      // Throw an appropriate HTTP exception (Status Code: 500)
      throw new InternalServerErrorException(
        'An error occurred during signup.',
      );
    }
  }
}
