import { GraphQLFieldConfig, GraphQLID, GraphQLNonNull } from "graphql";
import { MessageConnection } from "../MessageType";
import { ConnectionArguments, connectionArgs, fromGlobalId } from "graphql-relay";
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
  resolve: async (_src, args, ctx) => {
    if (!ctx.user) throw new UnauthorizedError();

    const roomId = fromGlobalId(args.roomId);

    return MessageLoader.loadAll(ctx, withFilter(args, {
      room: roomId.id
    }));
  }
}
