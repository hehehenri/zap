import { GraphQLObjectType } from "graphql";

import { Me } from "../modules/user/queries/Me";
import { roomQueries } from "../modules/room/queries";
import { Users } from "../modules/user/queries/Users";
import { RoomMessages } from "../modules/message/queries/RoomMessages";

export const query = new GraphQLObjectType({
  name: "Query",
  description: "Query Root",
  fields: () => ({
    me: Me,
    users: Users,
    roomMessages: RoomMessages,
    ...roomQueries,
  })
})
