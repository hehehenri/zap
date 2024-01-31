import { fromGlobalId, mutationWithClientMutationId, toGlobalId } from "graphql-relay";
import { GraphQLID, GraphQLNonNull, GraphQLString } from "graphql/type";

import { MessageConnection, MessageType } from "../MessageType";
import { MessageModel } from "../MessageModel";
import { InvalidPayloadError, UnauthorizedError } from "../../../routes/error";
import { events, pubsub } from "../../../pubsub";
import { RoomModel } from "../../room/RoomModel";
import { isRoomMember } from "../../room/helpers";
import { Context } from "@/context";
import { RoomLoader } from "@/modules/room/RoomLoader";
import { MessageLoader } from "../MessageLoader";

export const StoreMessageMutation = mutationWithClientMutationId({
  name: "StoreMessage",
  description: "Store user's message",
  inputFields: {
    content: { type: new GraphQLNonNull(GraphQLString) },
    roomId: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    message: {
      type: MessageConnection.edgeType,
      resolve: async ({ id }, _, ctx) => {
        const message = await MessageLoader.load(ctx, id);

        if (!message) return null;

        return {
          cursor: toGlobalId('Message', message._id),
          node: message
        }
      }
    }
  },
  mutateAndGetPayload: async ({ content, roomId: rId }, ctx: Context) => {
    if (!ctx.user) throw new UnauthorizedError();

    const roomId = fromGlobalId(rId);

    const room = await RoomLoader.load(ctx, roomId.id);

    if (!room) throw new InvalidPayloadError("room not found");

    if (!isRoomMember(room, ctx.user)) {
      throw new InvalidPayloadError("you can't send messages on this room");
    }

    const message = await new MessageModel({
      content,
      sender: ctx.user._id,
      room: room._id,
    }).save();

    await RoomModel.updateOne({ _id: room._id }, { $set: { lastMessage: message._id }});
    await pubsub.publish(events.message.added, { id: message._id, roomId: room.id });

    return { id: message._id };
  }
});
