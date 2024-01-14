import { mutationWithClientMutationId } from "graphql-relay";
import { GraphQLString } from "graphql/type";

import { MessageType } from "../MessageType";
import { Context } from "../../../routes/graphql";
import MessageModel from "../MessageModel";
import { RoomModel } from "../../room/RoomModel";
import { InvalidPayloadError } from "../../../routes/error";
import mongoose from "mongoose";

export const StoreMessageMutation = mutationWithClientMutationId({
  name: "StoreMessage",
  description: "Store user's message",
  inputFields: {
    content: { type: GraphQLString },
    roomId: { type: GraphQLString }
  },
  outputFields: {
    message: {
      type: MessageType,
      resolve: ({ message }) => message
    }
  },
  mutateAndGetPayload: async ({ content, roomId }, ctx: Context) => {
    const sender = ctx.user;
    if (!sender) return new Error("not authenticated");
    
    const message = new MessageModel({
      _id: new mongoose.Types.ObjectId(),
      content,
      sender,
      roomId: new mongoose.Types.ObjectId(roomId)
    });

    await message.save();
    await RoomModel.updateOne()

    return { message };
  }
});
