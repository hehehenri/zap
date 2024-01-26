import { GraphQLFieldConfig, GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import { GraphQLContext } from "../../../schemas/context";
import { RoomType } from "../RoomType";
import { InvalidPayloadError, UnauthorizedError } from "../../../routes/error";
import { RoomModel } from "../RoomModel";
import { isParticipant } from "../utils";

type Args = {
  roomId: string
};

export const Room: GraphQLFieldConfig<any, GraphQLContext, Args> = {
  type: RoomType,
  args: {
    roomId: { type: new GraphQLNonNull(GraphQLID)}
  },
  resolve: async (_src, args, context) => {
    const user = context.user;
    if (!user) throw new UnauthorizedError(); 

    const room = await RoomModel.findById(args.roomId);

    if (!room)
      throw new InvalidPayloadError("room doesn't exists")

    if (!isParticipant(room, user))
      throw new InvalidPayloadError("you can't access this room information");

    return room;
  },
} 
