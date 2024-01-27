import { GraphQLFieldConfig, GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import { RoomType } from "../RoomType";
import { InvalidPayloadError, UnauthorizedError } from "../../../routes/error";
import { RoomModel } from "../RoomModel";
import { isRoomMember } from "../helpers";
import { Context } from "@/context";

type Args = {
  roomId: string
};

export const Room: GraphQLFieldConfig<any, Context, Args> = {
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

    if (!isRoomMember(room, user))
      throw new InvalidPayloadError("you can't access this room information");

    return room;
  },
} 
