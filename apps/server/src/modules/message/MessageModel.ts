import { Document, Schema, model } from "mongoose"

export interface MessageDocument extends Document {
  sender: Schema.Types.ObjectId,
  room: Schema.Types.ObjectId,
  content: string,
  createdAt: Date,
};


export const messageSchema = new Schema<MessageDocument>({
    content: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  }, 
  { 
    collection: 'Message', 
    timestamps: true 
  }
);
messageSchema.index({ createdAt: 1 });

export const MessageModel = model<MessageDocument>('Message', messageSchema);
