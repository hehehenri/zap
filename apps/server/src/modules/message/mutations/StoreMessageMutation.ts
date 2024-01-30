import { mutationWithClientMutationId } from "graphql-relay";
import { GraphQLID, GraphQLNonNull, GraphQLString } from "graphql/type";

import { MessageType } from "../MessageType";
import { MessageModel } from "../MessageModel";
import { InvalidPayloadError, UnauthorizedError } from "../../../routes/error";
import { events, pubsub } from "../../../pubsub";
import { RoomModel } from "../../room/RoomModel";
import { isRoomMember } from "../../room/helpers";
import { Context } from "@/context";

export const StoreMessageMutation = mutationWithClientMutationId({
  name: "StoreMessage",
  description: "Store user's message",
  inputFields: {
    content: { type: new GraphQLNonNull(GraphQLString) },
    roomId: { type: new GraphQLNonNull(GraphQLID) }
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

    if (!isRoomMember(room, user)) {
      throw new InvalidPayloadError("you can't send messages on this room");
    }

    const message = new MessageModel({
      content,
      sender: user._id,
      room: room._id,
    });

    await message.save();
    await RoomModel.updateOne({ _id: roomId }, { $set: { lastMessage: message._id }});
    await pubsub.publish(events.message.added(roomId), { messageId: message._id.toString() })

    return { message };
  }
});
