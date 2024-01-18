import { GraphQLObjectType } from "graphql";

import { LoginMutation } from "../modules/user/mutations/LoginMutation";
import { RegisterMutation } from "../modules/user/mutations/RegisterMutation";
import { StoreMessageMutation } from "../modules/message/mutations/StoreMessageMutation";
import { GetOrCreateRoomMutation } from "../modules/room/mutations/GetOrCreateRoomMutation";

export const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    login: LoginMutation,
    register: RegisterMutation,
    storeMessage: StoreMessageMutation,
    getOrCreateRoom: GetOrCreateRoomMutation
  })
});
