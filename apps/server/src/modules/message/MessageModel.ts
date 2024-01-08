import mongoose from "mongoose"
import { UserDefinition, userSchema } from "../user/UserModel";

export type MessageDefinition = {
  readonly _id: mongoose.Types.ObjectId,
  readonly sender: UserDefinition,
  readonly content: string,
  readonly createdAt: Date,
};

export const messageSchema = new mongoose.Schema<MessageDefinition>({
    content: { type: String, required: true},
    sender: {type: userSchema, required: true}
  }, 
  { 
    collection: 'Message', 
    timestamps: true 
  }
);

const MessageModel = mongoose.model<MessageDefinition>('Message', messageSchema);

export default MessageModel;
