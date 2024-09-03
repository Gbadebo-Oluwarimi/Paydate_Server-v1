import mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
  todoTitle: { type: String },
  todoDescription: { type: String },
  todoExpiryDate: { type: String },
  UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
});
