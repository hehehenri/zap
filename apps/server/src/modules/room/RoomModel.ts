import mongoose from "mongoose";
import { UserDefinition, userSchema } from "../user/UserModel"
import { MessageDefinition, messageSchema } from "../message/MessageModel";

export type RoomDefinition = {
  readonly _id: mongoose.Types.ObjectId;
  readonly participants: UserDefinition[];
  messages: MessageDefinition[];
  readonly createdAt: Date,
  updatedAt: Date,
}

const schema = new mongoose.Schema<RoomDefinition>(
  {
    participants: [{ type: userSchema, required: true }],
    messages: [{type: messageSchema, required: true}]
  },
  {
    collection: "Room",
    timestamps: true
  }
)

const RoomModel = mongoose.model<RoomDefinition>("Room", schema);

export default RoomModel;
