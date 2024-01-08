import {mutationWithClientMutationId} from "graphql-relay";
import { GraphQLString, GraphQLNonNull } from "graphql/type";
import UserType from "../UserType";
import bcrypt from "bcrypt";
import config from "../../../config";
import UserModel from "../UserModel";
import { getToken } from "../../../authentication";


const RegisterMutation = mutationWithClientMutationId({
  name: "RegisterMutation",
  description: "Register user",
  inputFields: {
    username: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },
  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token
    },
    user: {
      type: UserType,
      resolve: ({ user }) => user
    },
  },
  mutateAndGetPayload: async ({ username, password }) => {
    const hasedPassword = await bcrypt.hash(password, config.jwt.saltRounds);

    const user = new UserModel({
      username,
      password: hasedPassword,
    })

    await user.save()

    const token = getToken(user, config.jwt.secret);

    return { user, token };
  }
});

export default RegisterMutation;
