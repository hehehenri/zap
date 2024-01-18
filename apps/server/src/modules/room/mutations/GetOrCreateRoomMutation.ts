import { mutationWithClientMutationId } from "graphql-relay";
import { GraphQLNonNull, GraphQLString } from "graphql/type";
import { RoomType } from "../RoomType";
import { RoomModel } from "../RoomModel";
import { UserModel } from "../../user/UserModel";
import { Context } from "../../../routes/graphql";

export const GetOrCreateRoomMutation = mutationWithClientMutationId({
  name: "GetOrCreateRoom",
  description: "Get the room based on it participants ids or create it if it doesn't exists yet.",
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    room: {
      type: RoomType,
      resolve: ({ room }) => room
    }
  },
  mutateAndGetPayload: async ({ userId }: { userId: string }, ctx: Context) => {
    const authUser = ctx.user;
    
    if (!authUser) return new Error("new authenticated");

    const room = await RoomModel.findOne({ $and: [
      { "participants._id": authUser._id },
      { "participants._id": userId },
    ]}).exec();

    if (room) return { room };

    const firstParticipant = await UserModel.findById(authUser._id).select("+password").exec();
    const secondParticipant = await UserModel.findById(userId).select("+password");
    
    const newRoom = new RoomModel({
      participants: [
        firstParticipant,
        secondParticipant
      ]
    });

    console.log({ newRoom });

    await newRoom.save();

    return { room: newRoom };
  }
})
