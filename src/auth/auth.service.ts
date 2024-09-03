import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../User/user.interface';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/User/User.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_MODEL')
    private UserModel: Model<User>,
    // private jwtService: JwtService,
  ) {}
  // don't forget to apply bcrypt for the password
  async validateuser(username: string, password: string): Promise<any> {
    console.log('validate user ran --auth-Service');
    const user = await this.UserModel.findOne({ username: username });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    } else {
      return null;
    }
  }

  async registerUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.UserModel(createUserDto);
    // for now we just save the user in the long run we will implement bcrypt for password hashing anad
    // other necessary authentication stuff
    return createdUser.save();
  }

  // async login(loginuser: LoginDto) {
  //   console.log(loginuser);
  //   const payload = { username: loginuser.username, sub: loginuser.id };
  //   if (payload) {
  //     console.log(payload);
  //     return {
  //       access_token: this.jwtService.sign(payload),
  //     };
  //   } else {
  //     console.log('This user dosent exist');
  //     return "this user dosen't exist Please Sign Up";
  //   }
  // }
}
