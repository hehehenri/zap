import { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLUnionType } from "graphql";
import { MongooseError } from "mongoose";

type ErrorKind = "InvalidPayloadError" | "UnauthorizedError" | "DatabaseError";
export type ErrorDefinition = {
  message: string,
  cause: string | null
  kind: ErrorKind
};

export const ErrorType = new GraphQLObjectType<ErrorDefinition>({
  name: "Error",
  fields: () => ({
    message: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (error) => error.message,
    },
    cause: {
      type: GraphQLString,
      resolve: (error) => error.cause,
    },
    errorKind: {
      type: GraphQLString,
      resolve: (error) => error.kind
    }
  })
})

export const invalidPayload = (message: string): ErrorDefinition => ({
  message: message,
  cause: null,
  kind: "InvalidPayloadError",
});

export const unauthorized = (): ErrorDefinition => ({
  message: "User not authorized",
  cause: null,
  kind: "UnauthorizedError"
});

export const databaseError = ({message, cause}: { message?: string, cause?: string}): ErrorDefinition => ({
  message: message ?? "Database query failed",
  cause: cause ?? null,
  kind: "DatabaseError"
});

export const parseMongooseError = (e: unknown) => {
  if (e instanceof MongooseError) {
    return databaseError({ cause: e.message });
  }

  return databaseError({});
};
