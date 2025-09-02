import { UserListDto } from '../domain/dto/user-list.dto';
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UserRepository } from '../infrastructure/repositories/user.repository';
import { User } from '../domain/entities/user.entity';
import { RegisterUserDto } from '../domain/dto/register-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}
  
  async getAllUsers(): Promise<UserListDto[]> {
    const users = await this.userRepository.findAll();
    return users.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
    }));
  }
  
  async registerUser(registerUserDto: RegisterUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOneByEmail(registerUserDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists.');
    }
    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
    const userToSave = { ...registerUserDto, password: hashedPassword };
    return this.userRepository.create(userToSave);
  }

  async login(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }
    const { password: _, ...result } = user;
    return result as User;
  }
}