class InvoiceItemDto {
  description: string;
  Items: string;
  Price: string;
  status: 'Paid' | 'Pending';
}

export class CreateInvoiceDto {
  invoiceTitle: String;
  invoiceDescription: String;
  invoiceItems: InvoiceItemDto[];
  InvoiceTax: String;
  InvoiceTotal: String;
  InvoiceRenewalDate: Date;
  InvoiceInitialDate: Date;
}
