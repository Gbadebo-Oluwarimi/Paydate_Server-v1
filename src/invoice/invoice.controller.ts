import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Req,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { Model } from 'mongoose';
import { Invoice } from './Invoice.interface';
import { AuthenticatedGuard } from 'src/auth/authenticated.guards';
import { CreateInvoiceDto } from './Invoice.dto';
import { UpdateInvoiceDto } from './updateinvoice.dto';
import { UpdateClientDto } from 'src/User/User.dto';

@Controller('invoice')
export class InvoiceController {
  constructor(
    private readonly invoiceService: InvoiceService,
    @Inject('INVOICE_MODEL')
    private InvoiceModel: Model<Invoice>,
  ) {}

  // route to get all the invoice of a user
  @UseGuards(AuthenticatedGuard)
  @Get('get_all')
  async getAllClientInvoice(@Request() req, @Response() res) {
    try {
      console.log('Userid', req.user._id);
      const invoice = await this.InvoiceModel.find({ UserId: req.user._id });
      if (!invoice) {
        return res.status(200).send({ message: 'No Invoice Found' });
      } else {
        return invoice;
      }
    } catch (error) {
      console.log('Error from get_invoice route', error);
    }
  }
  // rotue to get a all invoice of a particular client
  @UseGuards(AuthenticatedGuard)
  @Get('client_invoice_all/:id')
  async getInvoiceAllClient(
    @Param('id') id: String,
    @Request() req,
    @Response() res,
  ) {
    try {
      const ClientInvoice = await this.InvoiceModel.find({ ClientId: id });
      if (ClientInvoice) {
        return res.send({ ClientInvoice });
      } else {
        return res.send({ message: 'No invoice with that client id exists' });
      }
    } catch (error) {
      console.log('Error in the get particualar invoice route', error);
      return res.send({ error });
    }
  }

  //rotue to get a particular client invoice
  @UseGuards(AuthenticatedGuard)
  @Get('client_invoice/:id')
  async getPaticularClientInvoice(
    @Param('id') id: String,
    @Request() req,
    @Response() res,
  ) {
    try {
      const ClientInvoice = await this.InvoiceModel.findById(id);
      if (ClientInvoice) {
        return res.send({ ClientInvoice });
      } else {
        return res.send({ message: 'No invoice with that id exists' });
      }
    } catch (error) {
      console.log('Error in the get particualar invoice route', error);
      return res.send(error);
    }
  }

  // route to create an invoice
  @UseGuards(AuthenticatedGuard)
  @Post('create_invoice/:id')
  async createInvoice(
    @Param('id') id: String,
    @Body() CreateInvoiceDto,
    @Request() req,
    @Response() res,
  ) {
    try {
      console.log(id);
      // create a form validation function for this route so as not to
      // accept empty field etc
      const userInvoice = new this.InvoiceModel({
        ...CreateInvoiceDto,
        ClientId: id,
        UserId: req.user._id,
      });
      await userInvoice.save();
      return res.send({ userInvoice });
    } catch (error) {
      console.log('An Error Occured at the create invoice route', error);
      return error;
    }
  }
  // route to update an invoice
  @UseGuards(AuthenticatedGuard)
  @Put('update_client_invoice/:id')
  async updateClientInvoice(
    @Param('id') id: String,
    @Body() UpdateClientDto,
    @Request() req,
    @Response() res,
  ) {
    try {
      const updatedInvoice = await this.InvoiceModel.findByIdAndUpdate(
        id,
        UpdateClientDto,
      );
      return res.send({ message: 'Invoice Udpated Successfully' });
    } catch (error) {
      console.log('An Error Occured at the Update invoice route', error);
      return res.send({ error });
    }
  }

  // route to delete a particular invoice`
  @UseGuards(AuthenticatedGuard)
  @Post('delete_invoice/:id')
  async deleteInvoice(
    @Param('id') id: String,
    @Request() req,
    @Response() res,
  ) {
    try {
      const deleted = await this.InvoiceModel.findByIdAndDelete(id);
      if (deleted) {
        return res.send({ message: 'The invoice was deleted successfully' });
      } else {
        return res.send({ message: "That invoice dosen't exists" });
      }
    } catch (error) {
      console.log('Error occured when trying to delete the client', error);
      return res.send({ error });
    }
  }
}
