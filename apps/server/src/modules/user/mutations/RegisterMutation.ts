import {mutationWithClientMutationId} from "graphql-relay";
import { GraphQLString, GraphQLNonNull } from "graphql/type";
import { UserType } from "../UserType";
import config from "../../../config";
import { UserModel } from "../UserModel";
import { generateToken } from "../../../authentication";
import bcrypt from "bcryptjs";
import { databaseError, invalidPayload } from "../../../routes/error";

export const RegisterMutation = mutationWithClientMutationId({
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
    const salt = bcrypt.genSaltSync(config.jwt.saltRounds);
    const hasedPassword = bcrypt.hashSync(password, salt);

    try {
      const user = new UserModel({
        username,
        password: hasedPassword,
      })

      await user.save()

      const token = generateToken(user, config.jwt.secret);

      return { user, token };
    } catch (e) {
      if (!(e instanceof Error)) {
        throw new Error("unexpected error");
      }
      
      if (e.message.indexOf('duplicate key error') !== -1) {
        return invalidPayload("Username already registered");
      }

      return databaseError({ cause: e.message });
    }
  }
});
