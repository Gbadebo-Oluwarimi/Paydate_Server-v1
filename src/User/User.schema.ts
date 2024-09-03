import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  companyName: { type: String, required: true },
});

// Schema for the user client
export const ClientSchema = new mongoose.Schema({
  ClientName: String,
  ClientDescription: String,
  ClientContact: String,
  ClientAddress: String,
  ClientEmail: String,
  // ClientLogo:Image,
  UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
});
