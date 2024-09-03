import { Module } from '@nestjs/common';
import { TodoProviders } from './todo.Providers';
import { DatabaseModule } from 'src/database/database.module';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [TodoController],
  providers: [...TodoProviders, TodoService],
  exports: [...TodoProviders],
})
export class TodoModule {}
