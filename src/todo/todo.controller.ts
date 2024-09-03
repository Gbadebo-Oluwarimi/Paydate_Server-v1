import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guards';
import { todoDto } from './todo.dto';
import { Model } from 'mongoose';
import { todo } from './todo.interface';

@Controller('todo')
export class TodoController {
  constructor(
    @Inject('TODO_MODEL')
    private todoModel: Model<todo>,
    private todoService: TodoService,
  ) {}

  //route to create todo
  @UseGuards(AuthenticatedGuard)
  @Post('create_todo')
  async createTodo(@Body() tododto: todoDto, @Request() req, @Response() res) {
    try {
      const createdTodo = new this.todoModel({
        ...tododto,
        UserId: req.user._id,
      });
      await createdTodo.save();
      if (createdTodo) {
        return res.send({ createdTodo });
      } else {
        return res.send({ message: 'the todo was not created ' });
      }
    } catch (error) {
      console.log('Error occurred when trying to create todo', error);
      return res.send({ error });
    }
  }

  // route to get all todo
  @UseGuards(AuthenticatedGuard)
  @Get('get_all')
  async getAllUserTodo(@Request() req, @Response() res) {
    try {
      console.log('Userid', req.user._id);
      const todo = await this.todoModel.find({ UserId: req.user._id });
      if (!todo) {
        return res.status(200).send({ message: 'No Invoice Found' });
      } else {
        return res.send({ todo });
      }
    } catch (error) {
      console.log('Error from get_todo route', error);
      return res.send({ error });
    }
  }

  // route to get particular todo
  @UseGuards(AuthenticatedGuard)
  @Get('get_todo/:id')
  async getTodo(@Param('id') id: String, @Request() req, @Response() res) {
    try {
      const Todo = await this.todoModel.findById(id);
      if (Todo) {
        return res.send({ Todo });
      } else {
        return res.send({ message: 'No todo with that todo id exists' });
      }
    } catch (error) {
      console.log('Error in the get particualar todo route', error);
      return res.send({ error });
    }
  }

  // route to delete todo
  @UseGuards(AuthenticatedGuard)
  @Post('delete_todo/:id')
  async deleteInvoice(
    @Param('id') id: String,
    @Request() req,
    @Response() res,
  ) {
    try {
      const deleted = await this.todoModel.findByIdAndDelete(id);
      if (deleted) {
        return res.send({ message: 'The todo was deleted successfully' });
      } else {
        return res.send({ message: "That todo dosen't exists" });
      }
    } catch (error) {
      console.log('Error occured when trying to delete the todo', error);
      return res.send({ error });
    }
  }
}
