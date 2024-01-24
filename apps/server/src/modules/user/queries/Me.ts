import { GraphQLFieldConfig, GraphQLObjectType, GraphQLOutputType, GraphQLUnionType } from "graphql/type";
import { GraphQLContext } from "../../../schemas/context";
import { UserType } from "../UserType";
import { ErrorDefinition, ErrorType, unauthorized } from "../../../routes/error";

type ResponseDefinition = {
  data: GraphQLObjectType | null
  error: ErrorDefinition | null
};

const ResponseType = (DataType: GraphQLObjectType, TypeName: string) => new GraphQLUnionType({
  name: "Response",
  types: [ErrorType, DataType],
  resolveType: (response) => {
    if (Object.prototype.hasOwnProperty.call(response, "errorKind")) {
      return ErrorType.name
    }

    return DataType.name
  }
})

export const Me: GraphQLFieldConfig<any, GraphQLContext> = {
  type: ResponseType(UserType, "UserType"),
  description: "Get the authenticated user",
  resolve: (_root, _args, context) => {
    const user = context.user;
    console.log(user);

    if (!user) {
      return unauthorized();
    };

    return user;
  },
};
