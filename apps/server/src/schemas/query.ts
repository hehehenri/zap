import { GraphQLObjectType } from "graphql";

import Me from "../modules/user/queries/Me"
import Rooms from "../modules/room/queries/Rooms"

const query = new GraphQLObjectType({
  name: 'Query',
  description: 'Query Root',
  fields: () => ({
    me: Me,
    rooms: Rooms,
  })
})

export default query;
