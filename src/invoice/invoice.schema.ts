import * as mongoose from 'mongoose';

const invoiceItemSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    Items: { type: String, required: true },
    Price: { type: String, required: true },
    status: { type: String, enum: ['Paid', 'Pending'], required: true },
  },
  { _id: false },
);

export const InvoiceSchema = new mongoose.Schema({
  ClientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'client',
    required: true,
  },
  invoiceTitle: { type: String, required: true },
  invoiceDescription: { type: String, required: true },
  invoiceItems: [invoiceItemSchema],
  InvoiceTax: String,
  InvoiceTotal: String,
  InvoiceRenewalDate: Date,
  InvoiceInitialDate: Date,
  UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
});
