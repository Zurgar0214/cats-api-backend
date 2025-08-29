import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './application/user.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            registerUser: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call registerUser and return the registered user', async () => {
    const registerDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };
    const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };
    jest.spyOn(service, 'registerUser').mockResolvedValue(mockUser);

    const result = await controller.register(registerDto);

    expect(result).toEqual(mockUser);
    expect(service.registerUser).toHaveBeenCalledWith(registerDto);
  });

  it('should call login and return the logged-in user', async () => {
    const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };
    jest.spyOn(service, 'login').mockResolvedValue(mockUser);

    const result = await controller.login('test@example.com', 'password123');

    expect(result).toEqual(mockUser);
    expect(service.login).toHaveBeenCalledWith(
      'test@example.com',
      'password123',
    );
  });
});
