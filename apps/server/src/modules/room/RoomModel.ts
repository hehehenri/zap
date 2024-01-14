import mongoose from "mongoose";
import { UserDefinition, userSchema } from "../user/UserModel"

export type RoomDefinition = {
  readonly _id: mongoose.Types.ObjectId;
  readonly participants: UserDefinition[];
  readonly createdAt: Date,
  updatedAt: Date,
}

const schema = new mongoose.Schema<RoomDefinition>(
  {
    participants: [{ type: userSchema, required: true }],
  },
  {
    collection: "Room",
    timestamps: true
  }
)

export const RoomModel = mongoose.model<RoomDefinition>("Room", schema);
