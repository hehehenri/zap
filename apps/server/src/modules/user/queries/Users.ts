import { GraphQLFieldConfig, GraphQLNonNull } from "graphql";
import { GraphQLContext } from "../../../schemas/context";
import { UserConnection } from "../UserType";
import DataLoader from "dataloader";
import { connectionFromMongoCursor, mongooseLoader } from "@entria/graphql-mongoose-loader";
import UserModel from "../UserModel";

const users: GraphQLFieldConfig<any, GraphQLContext> = {
  type: new GraphQLNonNull(UserConnection.connectionType),
  description: "List users",
  resolve: async (_source, args, context) => {
    const user = context.user;

    // TODO: properly handle errors
    if (!user) throw new Error("not logged in");

    const loader = new DataLoader<string, Promise<any[]>>(ids => {
      return mongooseLoader(UserModel, ids); 
    });

    return connectionFromMongoCursor({
      cursor: UserModel.find({}),
      context,
      args,
      loader: (_, id) => loader.load(id.toString()),
    });
  }
}

export default users;
