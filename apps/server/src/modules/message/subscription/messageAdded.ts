import { subscriptionWithClientId } from "graphql-relay-subscription";
import { MessageType } from "../MessageType";
import { EVENTS, pubsub } from "../../../pubsub";
import MessageModel from "../MessageModel";
import { GraphQLContext } from "../../../schemas/context";

type NewMessage = {
  messageId: string
};

export const MessageAddedSubscription = subscriptionWithClientId<NewMessage, GraphQLContext>({
  name: 'MessageAdded',
  inputFields: { },
  outputFields: {
    message: {
      type: MessageType,
      resolve: async ({ messageId }) => await MessageModel.findById(messageId)
    }
  },
  subscribe: (input, context) => {
    console.log(`Subscribe: ${input}`, {context});

    return pubsub.asyncIterator(EVENTS.MESSAGE.ADDED);
  },
  getPayload: ({ messageId }) => {
    return { messageId };
  } 
});
