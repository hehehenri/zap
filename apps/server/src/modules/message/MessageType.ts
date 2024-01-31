import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { MessageDocument } from "./MessageModel";
import { globalIdField } from "graphql-relay";
import { connectionDefinitions } from '@entria/graphql-mongo-helpers';
import { UserType } from "../user/UserType";
import { RoomType } from "../room/RoomType";
import { MessageLoader } from "./MessageLoader";
import { UserLoader } from "../user/UserLoader";
import { RoomLoader } from "../room/RoomLoader";
import { nodeInterface, registerTypeLoader } from "../node/typeRegister";
import { Context } from "@/context";

export const MessageType = new GraphQLObjectType<MessageDocument, Context>({
  name: 'Message',
  fields: () => ({
    id: globalIdField('Message'),
    _id: {
      type: new GraphQLNonNull(GraphQLString),
      description: "mongoose _id",
      resolve: (user) => user._id.toString(),
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (message) => message.content,
    },
    sender: {
      type: new GraphQLNonNull(UserType),
      resolve: async (message, _args, ctx) => {
        return UserLoader.load(ctx, message.sender);
      }
    },
    room: {
      type: new GraphQLNonNull(RoomType),
      resolve: async (message, _args, ctx) => {
        return RoomLoader.load(ctx, message.room);
      }
    },
    sentAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (message) => message.createdAt.toString(),
    },    
  }),
  interfaces: () => [nodeInterface]
})

export const MessageConnection = connectionDefinitions({
  name: 'Message',
  nodeType: MessageType
})

registerTypeLoader(MessageType, MessageLoader.load);

export default MessageType;
