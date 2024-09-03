import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Response,
  Request,
  RawBody,
  Inject,
  Param,
  Put,
} from '@nestjs/common';
import { UserService } from './User.services';
import { CreateClientDto, CreateUserDto, UpdateClientDto } from './User.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guards';
import { Client } from './user.interface';
import { Model } from 'mongoose';

@Controller('User')
export class UserController {
  constructor(
    private readonly userservice: UserService,
    @Inject('CLIENT_MODEL')
    private ClientModel: Model<Client>,
  ) {}

  // route to create clients under a particular User
  @UseGuards(AuthenticatedGuard)
  @Post('create_client')
  async CreateClient(
    @Body() CreateClientDto,
    @Request() req,
    @Response() res,
  ): Promise<any> {
    console.log('Testing the create client route', req.user._id);

    try {
      if (!CreateClientDto) {
        return res.status(400).send({
          message: 'Please Fill in all the fields for the client',
        });
      }

      const createdClient = new this.ClientModel({
        ...CreateClientDto,
        UserId: req.user._id,
      });

      await createdClient.save();
      return res.status(201).send(createdClient);
    } catch (error) {
      console.error('Error creating client:', error);
      return res.status(500).send({
        message: 'An error occurred while creating the client',
        error: error.message,
      });
    }
  }

  // route to update client detaills in the future we might add client logo upload etc
  @UseGuards(AuthenticatedGuard)
  @Put('update_client/:id')
  async updateClientUser(
    @Param('id') id: String,
    @Body() UpdateClientDto,
    @Response() res,
  ) {
    try {
      console.log(id);
      const {
        ClientAddress,
        ClientDescription,
        ClientEmail,
        ClientContact,
        ClientName,
      } = UpdateClientDto;
      const updateUser = await this.ClientModel.findByIdAndUpdate(
        id,
        {
          ClientAddress,
          ClientContact,
          ClientDescription,
          ClientEmail,
          ClientName,
        },
        { new: true },
      );

      console.log('updated user', updateUser);
      return res.send({ message: 'User Updated Successfully' });
    } catch (error) {
      return error;
    }
  }
  // route to delete a particular client
  @UseGuards(AuthenticatedGuard)
  @Post('delete_client/:id')
  async deleteUserClient(
    @Param('id') id: String,
    @Request() req,
    @Response() res,
  ) {
    try {
      const deleteuser = await this.ClientModel.findByIdAndDelete(id);
      if (!deleteuser) {
        console.log("This user can't be deleted");
      } else {
        return res.status(200).send({
          message: `The user with this id ${id} was deleted successfully`,
        });
      }
    } catch (error) {
      console.log('Error at the deleteuser route', error);
    }
  }
  //route to fetch all the clients of a particular user
  @UseGuards(AuthenticatedGuard)
  @Get('clients')
  async getUserClients(@Request() req, @Response() res) {
    console.log(req.user._id);
    try {
      const users = await this.ClientModel.find({ UserId: req.user._id });
      console.log(users);
      return res.send({ users });
    } catch (err) {
      return res.send({ message: err.message });
    }
  }
  //route to fetch the particular details of a particular client

  @UseGuards(AuthenticatedGuard)
  @Get('client/:id')
  async findOneUserClient(
    @Param('id') id: String,
    @Response() res,
    @Request() req,
  ): Promise<any> {
    try {
      const client = await this.ClientModel.findById(id);
      if (!client) {
        return res.send({ message: 'No Client with this id exists' });
      } else {
        return res.send({ client });
      }
    } catch (error) {
      return res.send({ message: error.message });
    }
  }
}
