import { GraphQLFieldConfig, GraphQLNonNull } from "graphql";
import { RoomConnection } from "../RoomType";
import { UnauthorizedError } from "../../../routes/error";
import { ConnectionArguments, connectionArgs } from "graphql-relay";
import { Context } from "@/context";
import { RoomLoader } from "../RoomLoader";
import { withFilter } from "@entria/graphql-mongo-helpers";

export const Rooms: GraphQLFieldConfig<any, Context, ConnectionArguments> = {
  type: new GraphQLNonNull(RoomConnection.connectionType),
  description: "List user's rooms",
  args: connectionArgs,
  resolve: async (_source, args, context) => {
    const user = context.user;

    if (!user) {
      throw new UnauthorizedError
    };

    return RoomLoader.loadAll(context, withFilter(args, {
      participants: user._id
    }));
  }
}
