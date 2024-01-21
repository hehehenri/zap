import { subscriptionWithClientId } from "graphql-relay-subscription";
import { MessageType } from "../MessageType";
import { EVENTS, pubsub } from "../../../pubsub";
import { MessageModel } from "../MessageModel";
import { GraphQLContext } from "../../../schemas/context";

type NewMessage = {
  id: string,
  messageId: string,
};

export const MessageAddedSubscription = subscriptionWithClientId<NewMessage, GraphQLContext>({
  name: 'MessageAdded',
  inputFields: { },
  outputFields: {
    message: {
      type: MessageType,
      resolve: async ({ id }: NewMessage) => await MessageModel.findById(id)
    }
  },
  subscribe: () => {
    return pubsub.asyncIterator(EVENTS.MESSAGE.ADDED);
  },
  getPayload: (obj) => {
    return { id: obj.messageId };
  } 
});
