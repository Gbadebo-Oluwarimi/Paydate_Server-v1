// the user interface is for the application

import { Document } from 'mongoose';

export interface User extends Document {
  readonly username: string;
  readonly password: string;
  readonly email: string;
  readonly companyName: string;
}

export interface Client extends Document {
  readonly ClientName: String;
  readonly ClientDescription: String;
  readonly ClientContact: String;
  readonly ClientAddress: String;
  readonly ClientEmail: String;
}
