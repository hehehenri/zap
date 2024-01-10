import { GraphQLFieldConfig, GraphQLNonNull } from "graphql";
import { GraphQLContext } from "../../../schemas/context";
import { RoomConnection } from "../RoomType";
import RoomModel from "../RoomModel";
import { connectionFromMongoCursor, mongooseLoader } from "@entria/graphql-mongoose-loader";
import DataLoader from "dataloader";

const rooms: GraphQLFieldConfig<any, GraphQLContext> = {
  type: new GraphQLNonNull(RoomConnection.connectionType),
  description: "Get user's rooms",
  resolve: async (_source, args, context) => {
    const user = context.user;
    // TODO: write a middleware to check this
    if (!user) throw new Error("not logged in");

    const loader = new DataLoader(ids => {
      return mongooseLoader(RoomModel, ids as any);
    })

    return connectionFromMongoCursor({
      cursor: RoomModel.find({ participants: user }),
      context,
      args,
      loader: (_, id) => loader.load(id),
    })
  }
}

export default rooms;
