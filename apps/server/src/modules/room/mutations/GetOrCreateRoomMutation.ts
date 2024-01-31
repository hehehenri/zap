import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLID, GraphQLNonNull } from "graphql/type";
import { RoomType } from "../RoomType";
import { RoomModel } from "../RoomModel";
import { UserModel } from "../../user/UserModel";
import { InvalidPayloadError, UnauthorizedError } from "../../../routes/error";
import { Context } from "@/context";

export const GetOrCreateRoomMutation = mutationWithClientMutationId({
  name: "GetOrCreateRoom",
  description: "Get the room based on it participants ids or create it if it doesn't exists yet.",
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLID) }
  },
  outputFields: {
    room: {
      type: RoomType,
      resolve: ({ room }) => room
    }
  },
  mutateAndGetPayload: async ({ userId: uId }: { userId: string }, ctx: Context) => {
    const authUser = ctx.user;
    if (!authUser) throw new UnauthorizedError();

    const userId = fromGlobalId(uId);
    const user = await UserModel.findById(userId.id);
    if (!user) throw new InvalidPayloadError("user not found");

    const existingRoom = await RoomModel.findOne({ $and: [
      { "participants": authUser._id },
      { "participants": user._id },
    ]}).exec();

    if (existingRoom) return { room: existingRoom };
    
    const room = new RoomModel({
      participants: [
        authUser._id,
        user._id
      ]
    });

    await room.save();

    return { room };
  }
})
