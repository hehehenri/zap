import { Document, Schema, Types, model } from "mongoose";
import { MessageDefinition} from "../message/MessageModel";

export interface RoomDocument extends Document {
  participants: Types.ObjectId[];
  createdAt: Date,
  lastMessage: MessageDefinition | null,
  updatedAt: Date,
}

const roomSchema = new Schema<RoomDocument>(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message", required: false, default: null }
  },
  {
    collection: "Room",
    timestamps: true
  }
)


export const RoomModel = model<RoomDocument>("Room", roomSchema);
