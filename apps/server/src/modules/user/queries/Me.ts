import { GraphQLFieldConfig } from "graphql/type";
import { GraphQLContext } from "../../../schemas/context";
import { UserType } from "../UserType";
import { UnauthorizedError } from "../../../routes/error";

export const Me: GraphQLFieldConfig<any, GraphQLContext> = {
  type: UserType,
  description: "Get the authenticated user",
  resolve: (_root, _args, context) => {
    const user = context.user;

    if (!user) throw new UnauthorizedError();

    return user;
  },
};
