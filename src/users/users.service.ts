import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from 'src/signup/create_user.dto';
import * as bcrypt from 'bcrypt';

// This should be a real class/interface representing a user entity
export type User = {
  userId: number;
  username: string;
  password?: string;
  email: string;
};

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (e) {
    // Log the error
    console.error('Error hashing password:', e);
    // Throw a generic error message
    throw new Error('An error occurred while processing the request.');
  }
}

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'john',
      email: 'john@test.com',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      email: 'maria@test.com',
      password: 'guess',
    },
  ];

  async create(user: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await hashPassword(user.password);

      const newUser = {
        userId: this.users.length + 1,
        ...user,
        password: hashedPassword,
      };

      this.users.push(newUser);

      // Omit password when returning createdUser to the Response
      const { password, ...createdUser } = newUser;
      return createdUser;
    } catch (error) {
      // Log the error
      console.error('Error creating user:', error);
      // Throw an appropriate HTTP exception
      throw new InternalServerErrorException(
        'An error occurred while creating the user.',
      );
    }
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
