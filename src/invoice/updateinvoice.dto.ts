export class UpdateInvoiceDto {
  invoiceTitle?: string;
  invoiceDescription?: string;
  invoiceItems?: any[];
  InvoiceTax?: string;
  InvoiceTotal?: string;
  InvoiceRenewalDate?: Date;
  InvoiceInitialDate?: Date;
}
