import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UserDocument } from "./UserModel";
import { connectionDefinitions } from "graphql-relay";

export const UserType = new GraphQLObjectType<UserDocument>({
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
