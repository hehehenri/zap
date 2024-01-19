import mongoose from "mongoose"

export type MessageDefinition = {
  readonly _id: mongoose.Types.ObjectId,
  readonly sender: mongoose.Types.ObjectId,
  readonly room: mongoose.Types.ObjectId,
  readonly content: string,
  readonly createdAt: Date,
};


export const messageSchema = new mongoose.Schema<MessageDefinition>({
    content: { type: String, required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  }, 
  { 
    collection: 'Message', 
    timestamps: true 
  }
);
messageSchema.index({ createdAt: 1 });

export const MessageModel = mongoose.model<MessageDefinition>('Message', messageSchema);
