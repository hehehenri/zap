import {mutationWithClientMutationId} from "graphql-relay";
import { GraphQLString, GraphQLNonNull } from "graphql/type";
import bcrypt from "bcryptjs";

import { UserType } from "../UserType";
import { generateToken }  from "../../../authentication";
import config from "../../../config";
import { UserModel } from "../UserModel";
import { invalidPayload } from "../../../routes/error";

export const LoginMutation = mutationWithClientMutationId({
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
    // TODO: +password?
    const user = await UserModel.findOne({ username }).select('+password').exec();

    if (!user) {
      return invalidPayload("Invalid password or user not found");
    }
    
    const isValidPassword = bcrypt.compareSync(plainTextPassword, user.password);

    if (!isValidPassword) {
      return invalidPayload("Invalid password or user not found");
    }

    const token = generateToken(user, config.jwt.secret);

    return {
      token,
      user
    };
  }
});
