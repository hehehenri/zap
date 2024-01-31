import { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNullableType } from "graphql/type";
import { globalIdField } from "graphql-relay";
import { connectionDefinitions, objectIdResolver } from '@entria/graphql-mongo-helpers';

import { RoomDocument, RoomModel } from "./RoomModel";
import { UserType } from "../user/UserType";
import MessageType from "../message/MessageType";
import { MessageDocument } from "../message/MessageModel";
import { UserDocument } from "../user/UserModel";
import { nodeInterface, registerTypeLoader } from "../node/typeRegister";
import { RoomLoader } from "./RoomLoader";

const list = <T extends GraphQLNullableType>(type: T) => {
  return new GraphQLNonNull(new GraphQLList( new GraphQLNonNull(type)))
}

export const RoomType: GraphQLObjectType<RoomDocument, any> = new GraphQLObjectType<RoomDocument>({
  name: "Room",
  description: "Room Type",
  fields: () => ({
    id: globalIdField("Room"),
    _id: {
      type: new GraphQLNonNull(GraphQLString),
      description: "mongoose _id",
      resolve: (user) => user._id.toString(),
    },
    participants: {
      type: list(UserType),
      resolve: async (room) => {
        const roomModel = await RoomModel
          .findById(room._id)
          .populate<{ participants: UserDocument[] }>('participants')
          .exec();

        return roomModel?.participants
      }
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (room) => room.createdAt.toString(),
    },
    lastMessage: {
      type: MessageType,
      resolve: async (room) => {        
        const roomModel = await RoomModel
          .findById(room._id)
          .populate<{ lastMessage: MessageDocument}>('lastMessage')
          .exec();

        return roomModel?.lastMessage
      }
    },
    updatedAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (room) => room.updatedAt.toString(),
    }
  }),
  interfaces: () => [nodeInterface]
})

registerTypeLoader(RoomType, RoomLoader.load);

export const RoomConnection = connectionDefinitions({
  name: "Room",
  nodeType: RoomType
});
