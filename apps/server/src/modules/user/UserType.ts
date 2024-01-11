import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UserDefinition } from "./UserModel";
import { connectionDefinitions } from "graphql-relay";

const UserType = new GraphQLObjectType<UserDefinition>({
  name: "User",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user) => user._id.toString()
    },
    username: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user) => user.username
    }
  })
});

export const UserConnection = connectionDefinitions({
  name: "User",
  nodeType: UserType,
});

export default UserType;
