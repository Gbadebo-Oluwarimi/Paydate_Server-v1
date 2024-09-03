import { Model } from 'mongoose';
import { Injectable, Inject, Request, Body } from '@nestjs/common';
import { Client, User } from './user.interface';
import { CreateUserDto } from './User.dto';
@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private UserModel: Model<User>,

    @Inject('CLIENT_MODEL')
    private ClientModel: Model<Client>,
  ) {}
}
