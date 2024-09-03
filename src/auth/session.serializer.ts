import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/User/user.interface';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('USER_MODEL')
    private UserModel: Model<User>,
  ) {
    super();
  }

  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    console.log('the userid that is meant to b saved', user._doc._id);
    done(null, user._doc._id);
    console.log('Succesfully Serialized');
  }

  async deserializeUser(
    payload: any,
    done: (err: Error | null, user: any) => void,
  ): Promise<any> {
    console.log('Deserializing user with payload:', payload);
    const user = await this.UserModel.findById(payload);
    console.log('Deserialized user:', user);
    done(null, user);
  }
}
