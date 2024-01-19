import { mutationWithClientMutationId } from "graphql-relay";
import { GraphQLString } from "graphql/type";

import { MessageType } from "../MessageType";
import { Context } from "../../../routes/graphql";
import { MessageModel } from "../MessageModel";
import { InvalidPayloadError, UnauthorizedError } from "../../../routes/error";
import mongoose from "mongoose";
import { EVENTS, pubsub } from "../../../pubsub";
import { RoomModel } from "../../room/RoomModel";

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

    const room = await RoomModel.findById(roomId);

    if (!room) throw new InvalidPayloadError("room not found");

    const isRoomMember = room.participants.map(u => u._id).includes(user._id);

    if (!isRoomMember) throw new InvalidPayloadError("you can't send messages on this room");
    
    const message = new MessageModel({
      content,
      sender: new mongoose.Types.ObjectId(user._id),
      room: room._id,
    });

    await message.save();

    await RoomModel.updateOne({ _id: roomId }, { $set: { lastMessage: message._id }});

    console.log(`event published: ${EVENTS.MESSAGE.ADDED}`)
    await pubsub.publish(EVENTS.MESSAGE.ADDED, { messageId: message._id.toString() })

    return { message };
  }
});
