import { GraphQLFieldConfig } from "graphql/type";
import { GraphQLContext } from "../../../schemas/context";
import UserType from "../UserType";

const me: GraphQLFieldConfig<any, GraphQLContext> = {
  type: UserType,
  description: "Get the authenticated user",
  resolve: (_root, _args, context) => {
    const user = context.user;

    if (!user) throw new Error("not logged in");

    return user;
  },
};

export default me;
