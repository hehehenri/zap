import { GraphQLFieldConfig, GraphQLID, GraphQLNonNull } from "graphql";
import { MessageConnection } from "../MessageType";
import { ConnectionArguments, connectionArgs } from "graphql-relay";
import DataLoader from "dataloader";
import { connectionFromMongoCursor, mongooseLoader } from "@entria/graphql-mongoose-loader";
import { MessageModel } from "../MessageModel";
import { UnauthorizedError } from "../../../routes/error";
import { Context } from "@/context";

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
    
    const loader = new DataLoader<string, Promise<any>>(ids => {
      return mongooseLoader(MessageModel, ids);
    });

    return connectionFromMongoCursor({
      cursor: MessageModel.find({ room: args.roomId }).sort({ createdAt: -1}),
      context,
      args,
      loader: (_ctx, id) => loader.load(id.toString()),
    })
  }
}
