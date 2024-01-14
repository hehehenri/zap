import { GraphQLObjectType } from "graphql";

import { Me } from "../modules/user/queries/Me";
import { Rooms } from "../modules/room/queries/Rooms";
import { Users } from "../modules/user/queries/Users";
import { RoomMessages } from "../modules/message/queries/RoomMessages";

export const query = new GraphQLObjectType({
  name: "Query",
  description: "Query Root",
  fields: () => ({
    me: Me,
    rooms: Rooms,
    users: Users,
    roomMessages: RoomMessages,
  })
})
