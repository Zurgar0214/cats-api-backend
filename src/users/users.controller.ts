import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { UsersService } from './application/user.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { RegisterUserDto } from './domain/dto/register-user.dto';
import { User } from './domain/entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterUserDto, description: 'User registration data' })
  @ApiResponse({ status: 201, description: 'User successfully registered.', type: User })
  async register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return this.usersService.registerUser(registerUserDto);
  }

  @Get('login')
  @ApiOperation({ summary: 'Login and validate user credentials' })
  @ApiResponse({ status: 200, description: 'User successfully logged in.', type: User })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  async login(@Query('email') email: string, @Query('password') password: string): Promise<User> {
    return this.usersService.login(email, password);
  }
}