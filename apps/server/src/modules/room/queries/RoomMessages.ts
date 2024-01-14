import { GraphQLFieldConfig, GraphQLNonNull } from "graphql";
import { GraphQLContext } from "../../../schemas/context";
import { UnauthorizedError } from "type-graphql";
import { MessageConnection } from "../../message/MessageType";
import {
  connectionFromMongoCursor,
  mongooseLoader,
} from "@entria/graphql-mongoose-loader";
import { RoomModel } from "../RoomModel";
import { RoomType } from "../RoomType";

type Args = { roomId: string };

export const Room: GraphQLFieldConfig<any, GraphQLContext, Args> = {
  type: new GraphQLNonNull(RoomType),
  description: "Find room",
  resolve: async (_source, { roomId }, context) => {
    const user = context.user;

    if (!user) new UnauthorizedError();

    const room = RoomModel.findById(roomId).exec();
    const pog = 
  },
};
