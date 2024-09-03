import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseModule } from 'src/database/database.module';
import { Invoice } from './Invoice.interface';

@Injectable()
export class InvoiceService {
  constructor(
    @Inject('INVOICE_MODEL')
    private InvoiceModel: Model<Invoice>,
  ) {}

  async findInvoicesByDate(dateString: string): Promise<Invoice[]> {
    return this.InvoiceModel.find({ InvoiceRenewalDate: dateString }).exec();
  }
}
