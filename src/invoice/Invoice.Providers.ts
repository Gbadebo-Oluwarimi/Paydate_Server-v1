import { Connection } from 'mongoose';
import { InvoiceSchema } from './invoice.schema';

export const InvoiceProviders = [
  {
    provide: 'INVOICE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Invoice', InvoiceSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
