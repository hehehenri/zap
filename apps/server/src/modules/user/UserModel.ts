import mongoose from "mongoose";

export type UserDefinition = {
  readonly _id: mongoose.Types.ObjectId;
  readonly username: string
  readonly password: string
}

export const userSchema = new mongoose.Schema<UserDefinition>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true, select: false },
  },
  { collection: 'User' }
);

export const UserModel = mongoose.model<UserDefinition>('User', userSchema);
