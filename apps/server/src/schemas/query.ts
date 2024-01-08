import { GraphQLObjectType } from "graphql";

import me from '../modules/user/query/me';

const query = new GraphQLObjectType({
  name: 'Query',
  description: 'Query Root',
  fields: () => ({
    me,
  })
})

export default query
