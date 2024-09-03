import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { InvoiceProviders } from './Invoice.Providers';
import { UserService } from 'src/User/User.services';
import { DatabaseModule } from 'src/database/database.module';
import { InvoiceService } from './invoice.service';

@Module({
  imports: [DatabaseModule],
  controllers: [InvoiceController],
  providers: [InvoiceService, ...InvoiceProviders],
  exports: [...InvoiceProviders, InvoiceService],
})
export class InvoiceModule {}
