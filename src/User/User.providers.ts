import { Connection } from 'mongoose';
import { ClientSchema, UserSchema } from './User.schema';

export const UserProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'CLIENT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('client', ClientSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
