import mongoose from "mongoose";
import { UserDefinition, userSchema } from "../user/UserModel"
import { MessageDefinition, messageSchema } from "../message/MessageModel";

export type RoomDefinition = {
  readonly _id: mongoose.Types.ObjectId;
  readonly participants: UserDefinition[];
  readonly createdAt: Date,
  lastMessage: MessageDefinition | null,
  updatedAt: Date,
}

const roomSchema = new mongoose.Schema<RoomDefinition>(
  {
    participants: [{ type: userSchema, required: true }],
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message', required: false, default: null }
  },
  {
    collection: "Room",
    timestamps: true
  }
)


export const RoomModel = mongoose.model<RoomDefinition>("Room", roomSchema);
