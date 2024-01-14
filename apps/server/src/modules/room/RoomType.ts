import { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNullableType } from "graphql/type";
import { connectionDefinitions } from "graphql-relay";

import { RoomDefinition } from "./RoomModel";
import { UserType } from "../user/UserType";

const list = <T extends GraphQLNullableType>(type: T) => {
  return new GraphQLNonNull(new GraphQLList( new GraphQLNonNull(type)))
}

export const RoomType = new GraphQLObjectType<RoomDefinition>({
  name: "Room",
  description: "Room Type",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (room) => room._id.toString()
    },
    participants: {
      type: list(UserType),
      resolve: (room) => room.participants
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
