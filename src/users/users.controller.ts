import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './application/user.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { RegisterUserDto } from './domain/dto/register-user.dto';
import { LoginUserDto } from './domain/dto/login-user.dto';
import { User } from './domain/entities/user.entity';
import { UserListDto } from './domain/dto/user-list.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {

  @Get('get_all')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users', type: [UserListDto] })
  async getAllUsers(): Promise<UserListDto[]> {
    return this.usersService.getAllUsers();
  }
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterUserDto, description: 'User registration data' })
  @ApiResponse({ status: 201, description: 'User successfully registered.', type: User })
  async register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return this.usersService.registerUser(registerUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login and validate user credentials' })
  @ApiBody({ type: LoginUserDto, description: 'User login credentials' })
  @ApiResponse({ status: 200, description: 'User successfully logged in.', type: User })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  async login(@Body() loginUserDto: LoginUserDto): Promise<User> {
    return this.usersService.login(loginUserDto.email, loginUserDto.password);
  }
}