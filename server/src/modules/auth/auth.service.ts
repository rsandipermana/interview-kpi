import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/entities/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async validateUserByEmailOrUsername(
    emailOrUsername: string,
    password: string,
  ) {
    const user = await this.userModel
      .findOne({
        $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
      })
      .select('+password')
      .exec();

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async validateUserById(id: string) {
    const user = await this.userModel.findById(id).exec();
    return user;
  }

  async login(user: UserDocument) {
    const payload = { sub: user._id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(user: User) {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }
}
