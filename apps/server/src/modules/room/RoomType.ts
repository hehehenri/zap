import { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNullableType } from "graphql/type";
import { connectionDefinitions } from "graphql-relay";

import { RoomDefinition } from "./RoomModel";
import UserType from "../user/UserType";
import { MessageType } from "../message/MessageType";

const list = <T extends GraphQLNullableType>(type: T) => {
  return new GraphQLNonNull(new GraphQLList( new GraphQLNonNull(type)))
}

const RoomType = new GraphQLObjectType<RoomDefinition>({
  name: "Room",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (room) => room._id
    },
    participants: {
      type: list(UserType),
      resolve: (room) => room.participants
    },
    messages: {
      type: list(MessageType),
      resolve: (room) => room.messages
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (room) => room.createdAt.toString(),
    },
    updatedAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (room) => room.updatedAt.toString(),
    }
  })
})

export const RoomConnection = connectionDefinitions({
  name: "Room",
  nodeType: RoomType
});

export default RoomType;
