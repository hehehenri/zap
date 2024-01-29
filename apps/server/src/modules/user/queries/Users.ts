import { GraphQLFieldConfig, GraphQLNonNull } from "graphql";
import { UserConnection } from "../UserType";
import { UnauthorizedError } from "../../../routes/error";
import { ConnectionArguments, connectionArgs } from "graphql-relay";
import { Context } from "@/context";
import { UserLoader } from "../UserLoader";

export const Users: GraphQLFieldConfig<any, Context, ConnectionArguments> = {
  type: new GraphQLNonNull(UserConnection.connectionType),
  description: "List users",
  args: connectionArgs,
  resolve: async (_source, args, context) => {
    const user = context.user;

    if (!user) throw new UnauthorizedError();

    return UserLoader.loadAll(context, args);
  }
}
