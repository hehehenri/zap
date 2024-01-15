import { mutationWithClientMutationId } from "graphql-relay";
import { GraphQLString } from "graphql/type";

import { MessageType } from "../MessageType";
import { Context } from "../../../routes/graphql";
import MessageModel from "../MessageModel";
import { RoomModel } from "../../room/RoomModel";
import { InvalidPayloadError, UnauthorizedError } from "../../../routes/error";
import mongoose from "mongoose";
import { UserModel } from "../../user/UserModel";

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
    const user = ctx.user;

    if (!user) throw new UnauthorizedError();

    // TODO: why do we need to store the password too?
    const sender = await UserModel.findById(user._id).select("+password").exec();

    if (!sender) throw new InvalidPayloadError("user not found: " + user._id.toString());
    
    const message = new MessageModel({
      content,
      sender,
      room: new mongoose.Types.ObjectId(roomId)
    });

    await message.save();

    return { message };
  }
});
