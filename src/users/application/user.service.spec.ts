import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './user.service';
import { UserRepository } from '../infrastructure/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

jest.mock('bcrypt');

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
            findOneByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a user', async () => {
    jest.spyOn(userRepository, 'findOneByEmail').mockResolvedValue(null);
    const mockUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };
    jest
      .spyOn(userRepository, 'create')
      .mockResolvedValue({ id: '1', ...mockUser });
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword' as any);

    const result = await service.registerUser(mockUser);

    expect(result).toEqual({
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });
    expect(userRepository.create).toHaveBeenCalled();
  });

  it('should throw ConflictException if user already exists', async () => {
    jest
      .spyOn(userRepository, 'findOneByEmail')
      .mockResolvedValue({
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });

    await expect(
      service.registerUser({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      }),
    ).rejects.toThrow(ConflictException);
    expect(userRepository.create).not.toHaveBeenCalled();
  });

  it('should log in a user with valid credentials', async () => {
    const mockUser = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashedPassword',
    };
    jest.spyOn(userRepository, 'findOneByEmail').mockResolvedValue(mockUser);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

    const result = await service.login('test@example.com', 'password123');

    expect(result).toEqual({
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
    });
    expect(bcrypt.compare).toHaveBeenCalledWith(
      'password123',
      'hashedPassword',
    );
  });

  it('should throw UnauthorizedException with invalid credentials', async () => {
    jest.spyOn(userRepository, 'findOneByEmail').mockResolvedValue(null);

    await expect(
      service.login('invalid@example.com', 'wrongpassword'),
    ).rejects.toThrow(UnauthorizedException);
  });
});
