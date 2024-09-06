import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as session from 'express-session';
import * as cors from 'cors';
import * as passport from 'passport';
import { InvoiceService } from './invoice/invoice.service';
const cron = require('node-cron');

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:5173',
    }),
  );
  app.use(
    session({
      secret: 'topsecret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 400000, // Cookie is oonly valid for 4minute after login
        httpOnly: true, // Helps prevent XSS attacks
        secure: false,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  //checing of the port is running right
  const Port = process.env.PORT || 3000;
  console.log(Port);

  await app.listen(Port);

  const clientinvoiceService = app.get(InvoiceService);

  // Function that runs every day to check if an invoice/todo expiry date lands on today's date
  cron.schedule('* * * * *', async () => {
    function getTodayInISOFormat() {
      // Get the current date
      const date = new Date();

      // Set the time to midnight (00:00:00.000)
      date.setUTCHours(23, 0, 0, 0);

      // Format the date as an ISO string
      const isoDateString = date.toISOString();

      // Return the ISO date string
      return isoDateString;
    }

    // Example usage
    const todayISO = getTodayInISOFormat();
    console.log(todayISO);
    // Output: "YYYY/MM/DD" (example format)
    const invoices = await clientinvoiceService.findInvoicesByDate(todayISO);
    if (invoices.length === 0) {
      console.log('No invoices to be sent today');
    } else {
      console.log(invoices);
    }

    console.log('Running a task every minute');
  });
}

bootstrap();
