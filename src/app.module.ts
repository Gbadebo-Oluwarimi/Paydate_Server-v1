import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './User/User.module';
import { UserController } from './User/User.controller';
import { UserService } from './User/User.services';
import { AuthModule } from './auth/auth.module';
import { TodoService } from './todo/todo.service';
import { TodoController } from './todo/todo.controller';
import { TodoModule } from './todo/todo.module';
import { InvoiceService } from './invoice/invoice.service';
import { InvoiceController } from './invoice/invoice.controller';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [UserModule, AuthModule, TodoModule, InvoiceModule],
  controllers: [AppController, TodoController, InvoiceController],
  providers: [AppService, TodoService, InvoiceService],
})
export class AppModule {}
