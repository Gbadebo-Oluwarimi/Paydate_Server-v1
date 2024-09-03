import { Document } from 'mongoose';

export interface Invoice extends Document {
  readonly invoiceTitle: String;
  readonly invoiceDescription: String;
  readonly invoiceItems: [
    {
      description: String;
      Items: String;
      Price: String;
      status: ['Paid', 'Pending'];
    },
  ];
  readonly InvoiceTax: String;
  readonly InvoiceTotal: String;
  readonly InvoiceRenewalDate: Date;
  readonly InvoiceInitialDate: Date;
}
