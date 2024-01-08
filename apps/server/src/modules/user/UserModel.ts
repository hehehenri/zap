import mongoose from "mongoose";

export type UserDefinition = {
  readonly _id: mongoose.Types.ObjectId;
  readonly username: string
  readonly password: string
}

export const schema = new mongoose.Schema<UserDefinition>({
  username: { type: String, required: true },
})

const UserModel = mongoose.model<UserDefinition>('User', schema);

export default UserModel;
