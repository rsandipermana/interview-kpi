import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: ObjectID): Promise<User> {
    const one = await this.userRepository.findOne(id);
    return one;
  }

  async create(user: User): Promise<User | any> {
    return await this.userRepository.save(user);
  }

  async update(id: ObjectID, user: User): Promise<User> {
    const userToUpdate = await this.userRepository.findOne(id);
    userToUpdate.name = user.name;
    userToUpdate.email = user.email;
    userToUpdate.username = user.username;
    userToUpdate.password = user.password;
    userToUpdate.role = user.role;
    return await this.userRepository.save(userToUpdate);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
