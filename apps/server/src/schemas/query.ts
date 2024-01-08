import { GraphQLObjectType } from "graphql";

import Me from '../modules/user/queries/Me';

const query = new GraphQLObjectType({
  name: 'Query',
  description: 'Query Root',
  fields: () => ({
    me: Me,
  })
})

export default query;
