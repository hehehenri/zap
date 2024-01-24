import { GraphQLFieldConfig, GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import { GraphQLContext } from "../../../schemas/context";
import { RoomType } from "../RoomType";
import { RoomModel } from "../RoomModel";
import { invalidPayload, unauthorized } from "../../../routes/error";

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
    if (!user) {
      return unauthorized();
    }

    const room = await RoomModel.findById(args.roomId);

    if (!room) {
      return invalidPayload("room doesn't exists");
    }

    const isParticipant = room
      .participants
      .filter(partId => partId.toString() == user._id.toString())

    if (!isParticipant) {
      return invalidPayload("you can't access this room information");
    }

    return room;
  },
} 
