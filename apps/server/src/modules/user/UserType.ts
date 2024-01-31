import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UserDocument } from "./UserModel";
import { globalIdField } from "graphql-relay";
import { connectionDefinitions, objectIdResolver } from '@entria/graphql-mongo-helpers';
import { nodeInterface, registerTypeLoader } from "../node/typeRegister";
import { UserLoader } from "./UserLoader";

export const UserType = new GraphQLObjectType<UserDocument>({
  name: "User",
  fields: () => ({
    id: globalIdField('User'),
    _id: {
      type: new GraphQLNonNull(GraphQLString),
      description: "mongoose _id",
      resolve: (user) => user._id.toString(),
    },
    username: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user) => user.username
    }
  }),
  interfaces: () => [nodeInterface]
});

registerTypeLoader(UserType, UserLoader.load);

export const UserConnection = connectionDefinitions({
  name: "User",
  nodeType: UserType,
});
