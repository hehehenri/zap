import { subscriptionWithClientId } from "graphql-relay-subscription";
import { MessageType } from "../MessageType";
import { events, pubsub } from "../../../pubsub";
import { MessageModel } from "../MessageModel";
import { GraphQLContext } from "../../../schemas/context";
import { GraphQLID, GraphQLNonNull } from "graphql";

type NewMessage = {
  id: string,
  messageId: string,
};

type Input = {
  roomId: string
};

export const MessageAddedSubscription = subscriptionWithClientId<NewMessage, GraphQLContext, Input>({
  name: 'MessageAdded',
  inputFields: {
    roomId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    message: {
      type: MessageType,
      resolve: async ({ id }: NewMessage) => await MessageModel.findById(id)
    }
  },
  subscribe: ({ roomId }) => {
    return pubsub.asyncIterator(events.message.added(roomId));
  },
  getPayload: (obj) => {
    return { id: obj.messageId };
  } 
});
