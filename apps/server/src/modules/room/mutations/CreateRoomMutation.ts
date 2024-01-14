import { mutationWithClientMutationId } from "graphql-relay";
import { GraphQLNonNull, GraphQLID, GraphQLList, GraphQLString } from "graphql/type";
import { RoomType } from "../RoomType";
import { RoomModel } from "../RoomModel";
import { UserModel } from "../../user/UserModel";
import { Context } from "../../../routes/graphql";

export const CreateRoomMutation = mutationWithClientMutationId({
  name: "CreateRoom",
  description: "Create Room",
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

    const firstParticipant = await UserModel.findById(authUser._id).select("+password").exec();
    const secondParticipant = await UserModel.findById(userId).select("+password");
    
    const room = new RoomModel({
      participants: [
        firstParticipant,
        secondParticipant
      ]
    });

    await room.save();

    return { room };
  }
})
