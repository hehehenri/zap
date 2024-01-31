import { MessageAddedSubscription, MessageAddedSubscription$variables } from "@/__generated__/MessageAddedSubscription.graphql";
import { useMemo } from "react";
import { useSubscription } from "react-relay";
import { GraphQLSubscriptionConfig, graphql } from "relay-runtime";

const messageAddedSubscription = graphql`
  subscription MessageAddedSubscription($input: MessageAddedInput!, $connections: [ID!]!) {
    messageAddedSubscribe(input: $input) {
      message @prependEdge(connections: $connections) {
        cursor
        node {
          id
          content
          sender {
            id
            username
          }
          sentAt
        }
      }
    }
  }
`

export const useMessageAddedSubscription = (variables: MessageAddedSubscription$variables) => {
  const config = useMemo<GraphQLSubscriptionConfig<MessageAddedSubscription>>(
    () => ({
      subscription: messageAddedSubscription,
      onNext: res => {
        console.log(res);
      },
      variables,
    }),
    [variables],
  );

  useSubscription(config);
}
