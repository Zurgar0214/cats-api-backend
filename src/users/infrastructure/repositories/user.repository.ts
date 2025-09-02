import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { User as UserEntity } from '../../domain/entities/user.entity';

@Injectable()
export class UserRepository {
  async findAll(): Promise<UserEntity[]> {
    const userDocs = await this.userModel.find().exec();
    return userDocs.map(doc => this.toDomain(doc));
  }
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: User): Promise<UserEntity> {
    const createdUser = new this.userModel(user);
    const savedUser = await createdUser.save();
    return { ...this.toDomain(savedUser), password: "" };
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    const userDoc = await this.userModel.findOne({ email }).exec();
    if (!userDoc) {
      return null;
    }
    return this.toDomain(userDoc);
  }

  private toDomain(userDoc: UserDocument): UserEntity {
    return {
      id: userDoc._id.toString(),
      name: userDoc.name,
      email: userDoc.email,
      password: userDoc.password,
    };
  }
}
