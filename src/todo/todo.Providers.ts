import { Connection } from 'mongoose';
import { TodoSchema } from './todo.schema';

export const TodoProviders = [
  {
    provide: 'TODO_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Todo', TodoSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
