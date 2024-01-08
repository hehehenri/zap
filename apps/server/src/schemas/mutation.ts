import { GraphQLObjectType } from "graphql";

import loginMutation from "../modules/user/mutation/login";

const mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Mutation Root",
  fields: () => ({
    login: loginMutation
  })
});

export default mutation;
