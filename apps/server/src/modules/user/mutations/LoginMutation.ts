import {mutationWithClientMutationId} from "graphql-relay";
import { GraphQLString, GraphQLNonNull } from "graphql/type";
import bcrypt from "bcrypt";

import UserType from "../UserType";
import { getToken }  from "../../../authentication";
import config from "../../../config";
import UserModel from "../UserModel";

const LoginMutation = mutationWithClientMutationId({
  name: "LoginMutation",
  description: "Validate password and return user's token",
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
    }
  },
  mutateAndGetPayload: async ({ username, password: plainTextPassword }) => {
    const user = await UserModel.findOne({ username }).select('+password').exec();

    if (!user) throw new Error('invalid password or user not found');
    
    const isValidPassword = await bcrypt.compare(plainTextPassword, user.password);

    if (!isValidPassword) throw new Error('invalid password or user not found');

    const token = getToken(user, config.jwt.secret);

    return {
      token,
      user
    };
  }
});

export default LoginMutation;
