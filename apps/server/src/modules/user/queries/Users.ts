import { GraphQLFieldConfig, GraphQLNonNull } from "graphql";
import { GraphQLContext } from "../../../schemas/context";
import { UserConnection } from "../UserType";
import DataLoader from "dataloader";
import { connectionFromMongoCursor, mongooseLoader } from "@entria/graphql-mongoose-loader";
import { UserModel } from "../UserModel";
import { ConnectionArguments, connectionArgs } from "graphql-relay";
import { unauthorized } from "../../../routes/error";

export const Users: GraphQLFieldConfig<any, GraphQLContext, ConnectionArguments> = {
  type: new GraphQLNonNull(UserConnection.connectionType),
  description: "List users",
  args: connectionArgs,
  resolve: async (_source, args, context) => {
    const user = context.user;

    if (!user) {
      return unauthorized();
    }

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
