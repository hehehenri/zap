import { subscriptionWithClientId } from "graphql-relay-subscription";
import { GraphQLString, GraphQLNonNull } from "graphql/type";
import { MessageType } from "../MessageType";

const MessageAddedSubscription = subscriptionWithClientId({
  name: 'MessageAdded',
  inputFields: {
    content: { type: new GraphQLNonNull(GraphQLString)}
  },
  outputFields: {
    message: {
      type: MessageType,
      resolve: (message) => message
    }
  }
});

export default MessageAddedSubscription;
