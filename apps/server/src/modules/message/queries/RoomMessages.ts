import { GraphQLFieldConfig, GraphQLID, GraphQLNonNull } from "graphql";
import { MessageConnection } from "../MessageType";
import { ConnectionArguments, connectionArgs } from "graphql-relay";
import { UnauthorizedError } from "../../../routes/error";
import { Context } from "@/context";
import { MessageLoader } from "../MessageLoader";
import { withFilter } from "@entria/graphql-mongo-helpers";

export const RoomMessages: GraphQLFieldConfig<any, Context, ConnectionArguments & {
  roomId: string
}> = {
  type: new GraphQLNonNull(MessageConnection.connectionType),
  description: "List room messages",
  args: {
    ...connectionArgs,
    roomId: {
      type: new GraphQLNonNull(GraphQLID),
      description: "The messages' room id"
    }
  },
  resolve: async (_src, args, context) => {
    const user = context.user;

    if (!user) throw new UnauthorizedError();

    return await MessageLoader.loadAll(context, withFilter(args, {
      room: args.roomId
    }));
  }
}
