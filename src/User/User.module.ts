import { Module } from '@nestjs/common';
import { UserController } from './User.controller';
import { UserService } from './User.services';
import { UserProviders } from './User.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...UserProviders],
  exports: [...UserProviders],
})
export class UserModule {}
