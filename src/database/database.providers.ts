import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> => {
      try {
        const db = await mongoose.connect(process.env.MONGO_URL);
        console.log('Database connected');
        return db;
      } catch (error) {
        console.error('Error connecting to database:', error);
        throw error; // Re-throw the error to let NestJS handle it
      }
    },
  },
];
