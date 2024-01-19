import { GraphQLFieldConfig, GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import { GraphQLContext } from "../../../schemas/context";
import { RoomType } from "../RoomType";
import { InvalidPayloadError, UnauthorizedError } from "../../../routes/error";
import { RoomModel } from "../RoomModel";
import { UserDefinition } from "../../user/UserModel";

type Args = {
  roomId: string
};

const isParticipant = (user: UserDefinition, participants: UserDefinition[]) => {
  return participants.filter(part => part._id.toString() == user._id.toString());
}

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

    if (!isParticipant(user, room.participants))
      throw new InvalidPayloadError("you can't access this room information");

    return room;
  },
} 
