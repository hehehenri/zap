import { mutationWithClientMutationId } from "graphql-relay";
import { GraphQLNonNull, GraphQLID, GraphQLList } from "graphql/type";
import RoomType from "../RoomType";
import RoomModel from "../RoomModel";
import UserModel from "../../user/UserModel";

type Args = {
  participants: string[]
}

const CreateRoomMutation = mutationWithClientMutationId({
  name: "CreateRoom",
  description: "Create Room",
  inputFields: {
    participants: { 
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID))),
    }
  },
  outputFields: {
    room: {
      type: RoomType,
      resolve: ({ room }) => room
    }
  },
  mutateAndGetPayload: async ({participants}: Args) => {
    if (participants.length < 2) {
      throw new Error("room must have at least two participants");
    }
    
    const userParticipants = participants.map(id => UserModel.findById(id));
    
    const room = await new RoomModel({
      participants: userParticipants,
      messages: [],
    }).save();

    return { room };
  }
})

export default CreateRoomMutation;
