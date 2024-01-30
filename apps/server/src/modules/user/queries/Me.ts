import { GraphQLFieldConfig } from "graphql/type";
import { UserType } from "../UserType";
import { UnauthorizedError } from "../../../routes/error";
import { Context } from "../../../context";

export const Me: GraphQLFieldConfig<any, Context> = {
  type: UserType,
  description: "Get the authenticated user",
  resolve: (_root, _args, context) => {
    const user = context.user;

    if (!user) throw new UnauthorizedError();

    return user;
  },
};
