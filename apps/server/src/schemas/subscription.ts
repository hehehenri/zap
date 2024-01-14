import { GraphQLObjectType } from "graphql";
import MessageAddedSubscription from "../modules/message/subscription/messageAdded";

export const subscription = new GraphQLObjectType({
  name: "Subscription",
  description: "Subscription Root",
  fields: () => ({
    messageAdded: MessageAddedSubscription,
  })
});
