import {mutationWithClientMutationId} from "graphql-relay";
import { GraphQLString, GraphQLNonNull, GraphQLID } from "graphql/type";

import { MessageType } from "../MessageType";
import { Context } from "../../../routes/graphql";
import MessageModel from "../MessageModel";
import RoomModel from "../../room/RoomModel";

const StoreMessageMutation = mutationWithClientMutationId({
  name: "StoreMessage",
  description: "Store user's message",
  inputFields: {
    content: { type: new GraphQLNonNull(GraphQLString) },
    room_id: { type: new GraphQLNonNull(GraphQLID) }
  },
  outputFields: {
    message: {
      type: MessageType,
      resolve: ({ message }) => message
    }
  },
  mutateAndGetPayload: async ({ content, room_id }, ctx: Context) => {
    if (!ctx.user) {
      return new Error("not authenticated")
    }
    
    const message = new MessageModel({
      content,

    });

    // TODO: add to the room and save inside a transaction

    await RoomModel.findOneAndUpdate(room_id, {
      $push: {
        messages: message
      }
    });

    return { message };
  }
});

export default StoreMessageMutation;
