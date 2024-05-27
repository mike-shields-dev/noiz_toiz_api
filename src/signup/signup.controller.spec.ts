import { Test, TestingModule } from '@nestjs/testing';
import { SignupController } from './signup.controller';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './create_user.dto';
import * as bcrypt from 'bcrypt';

// Mock bcrypt
jest.mock('bcrypt');

describe('SignupController', () => {
  let signupController: SignupController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SignupController],
      providers: [UsersService],
    }).compile();

    signupController = module.get<SignupController>(SignupController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should handle errors from bcrypt.hash correctly', async () => {
    // Arrange
    const createUserDto: CreateUserDto = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    };

    // Mock bcrypt.hash to throw an error
    (bcrypt.hash as jest.Mock).mockRejectedValue(new Error('Hashing failed'));

    // Act & Assert
    await expect(signupController.signUp(createUserDto)).rejects.toThrow(
      'An error occurred during signup.',
    );
  });

  it('should successfully create a new user when there are no errors', async () => {
    // Arrange
    const createUserDto: CreateUserDto = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    };

    // Mock bcrypt.hash to return a hashed password
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');

    // Mock UsersService.create to return a user
    const mockUser = {
      userId: 1,
      username: 'testuser',
      email: 'testuser@example.com',
    };
    jest.spyOn(usersService, 'create').mockResolvedValue(mockUser);

    // Act
    const result = await signupController.signUp(createUserDto);

    // Assert
    expect(result).toEqual(mockUser);
  });
});
