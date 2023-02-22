import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw new Error(`Unable to find users. Error: ${error.message}`);
    }
  }

  async findOne(id: ObjectId): Promise<User> {
    try {
      return await this.userModel.findById(id).exec();
    } catch (error) {
      throw new Error(`Unable to find user. Error: ${error.message}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const createdUser = new this.userModel(user);
      return await createdUser.save();
    } catch (error) {
      throw new Error(`Unable to create user. Error: ${error.message}`);
    }
  }

  async update(id: ObjectId, user: User): Promise<User> {
    try {
      const userToUpdate = await this.userModel.findById(id).exec();
      userToUpdate.name = user.name;
      userToUpdate.email = user.email;
      userToUpdate.username = user.username;
      userToUpdate.password = user.password;
      userToUpdate.role = user.role;
      return await userToUpdate.save();
    } catch (error) {
      throw new Error(`Unable to update user. Error: ${error.message}`);
    }
  }

  async delete(id: ObjectId): Promise<void> {
    try {
      await this.userModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new Error(`Unable to delete user. Error: ${error.message}`);
    }
  }
}
