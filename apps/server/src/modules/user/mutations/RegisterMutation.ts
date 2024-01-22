import {mutationWithClientMutationId} from "graphql-relay";
import { GraphQLString, GraphQLNonNull } from "graphql/type";
import { UserType } from "../UserType";
import config from "../../../config";
import { UserModel } from "../UserModel";
import { generateToken } from "../../../authentication";
import { DatabaseError, InvalidPayloadError } from "../../../routes/error";
import bcrypt from "bcryptjs";

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

    const user = new UserModel({
      username,
      password: hasedPassword,
    })

    try { 
      await user.save()
    } catch (e) {
      if (!(e instanceof Error)) {
        throw new Error("unexpected error");
      }
      
      if (e.message.indexOf('duplicate key error') !== -1) {
        throw new InvalidPayloadError("Username already registered");
      }

      throw new DatabaseError({ cause: e.message });
    }

    const token = generateToken(user, config.jwt.secret);

    return { user, token };
  }
});
