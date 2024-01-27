import { GraphQLFieldConfig, GraphQLNonNull } from "graphql";
import { UserConnection } from "../UserType";
import DataLoader from "dataloader";
import { connectionFromMongoCursor, mongooseLoader } from "@entria/graphql-mongoose-loader";
import { UserModel } from "../UserModel";
import { UnauthorizedError } from "../../../routes/error";
import { ConnectionArguments, connectionArgs } from "graphql-relay";
import { Context } from "@/context";

export const Users: GraphQLFieldConfig<any, Context, ConnectionArguments> = {
  type: new GraphQLNonNull(UserConnection.connectionType),
  description: "List users",
  args: connectionArgs,
  resolve: async (_source, args, context) => {
    const user = context.user;

    if (!user) throw new UnauthorizedError();

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
