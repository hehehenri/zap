import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { MessageDefinition } from "./MessageModel";
import { connectionDefinitions } from "graphql-relay";
import UserType from "../user/UserType";

export const MessageType = new GraphQLObjectType<MessageDefinition>({
  name: 'Message',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (message) => message._id,
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (message) => message.content,
    },
    sender: {
      type: new GraphQLNonNull(UserType),
      resolve: (message) => message.sender,
    },
    sentAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (message) => message.createdAt.toString(),
    }
  })
})

export const MessageConnection = connectionDefinitions({
  name: 'Message',
  nodeType: MessageType
})
