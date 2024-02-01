import { subscriptionWithClientId } from "graphql-relay-subscription";
import { MessageConnection } from "../MessageType";
import { events, pubsub } from "../../../pubsub";
import { GraphQLNonNull, GraphQLString } from "graphql";
import { Context } from "@/context";
import { MessageLoader } from "../MessageLoader";
import { fromGlobalId, toGlobalId } from "graphql-relay";
import { withFilter } from "graphql-subscriptions";

type NewMessage = {
  id: string,
  roomId: string,
};

export const MessageAddedSubscription = subscriptionWithClientId<NewMessage, Context>({
  name: 'MessageAdded',
  inputFields: {
    roomId: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    message: {
      type: MessageConnection.edgeType,
      resolve: async ({ id }: NewMessage, _, ctx) => {        
        const node = await MessageLoader.load(ctx, id);
        if (!node) return null;

        console.log({ "new messsage": node.content });
        
        return {
          node,
          cursor: toGlobalId('Message', node._id)
        }
      }
    }
  },
  subscribe: withFilter(
    () => pubsub.asyncIterator(events.message.added),
    (value, _, input) => {
      const roomId = fromGlobalId(input.variableValues.input.roomId).id;
      return value.roomId.equals(roomId);
    }
  ),
  getPayload: ({ id }) => ({ id })
  });
