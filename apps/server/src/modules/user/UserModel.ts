import { Document, Schema, model } from "mongoose";

export interface UserDocument extends Document {
  username: string
  password: string
};

const UserSchema = new Schema(
  {
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true, select: false },
  },
  { collection: 'User' }
);

export const UserModel = model<UserDocument>('User', UserSchema);
