import {mutationWithClientMutationId} from "graphql-relay";
import { GraphQLString, GraphQLNonNull } from "graphql/type";
import { UserType } from "../UserType";
import bcrypt from "bcrypt";
import config from "../../../config";
import { UserModel } from "../UserModel";
import { generateToken } from "../../../authentication";
import { DatabaseError, InvalidPayloadError } from "../../../routes/error";


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
    const hasedPassword = await bcrypt.hash(password, config.jwt.saltRounds);

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

      console.log(e.message);
      
      if (e.message.indexOf('duplicate key error') !== -1) {
        throw new InvalidPayloadError("Username already registered");
      }

      throw new DatabaseError({ cause: e.message });
    }

    const token = generateToken(user, config.jwt.secret);

    return { user, token };
  }
});
