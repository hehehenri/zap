import { subscriptionWithClientId } from "graphql-relay-subscription";
import { MessageType } from "../MessageType";
import { events, pubsub } from "../../../pubsub";
import { GraphQLID, GraphQLNonNull } from "graphql";
import { Context } from "@/context";
import { MessageLoader } from "../MessageLoader";

type NewMessage = {
  id: string,
  messageId: string,
};

type Input = {
  roomId: string
};

export const MessageAddedSubscription = subscriptionWithClientId<NewMessage, Context, Input>({
  name: 'MessageAdded',
  inputFields: {
    roomId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    message: {
      type: MessageType,
      resolve: async ({ id }: NewMessage, _, ctx) => {
        return await MessageLoader.load(ctx, id);
      }
    }
  },
  subscribe: ({ roomId }, ctx, info) => {
    const values = info.variableValues.input;
    console.log({ values });

    return pubsub.asyncIterator(events.message.added(roomId));
  },
  getPayload: (obj) => {
    return { id: obj.messageId };
  }
});
