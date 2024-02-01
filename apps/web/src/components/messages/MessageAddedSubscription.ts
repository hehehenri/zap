import { MessageAddedSubscription, MessageAddedSubscription$variables } from "@/__generated__/MessageAddedSubscription.graphql";
import { createContext, useContext, useMemo } from "react";
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

export const OnMessageContext = createContext<(() => void) | null>(null);

export const useMessageAddedSubscription = (variables: MessageAddedSubscription$variables) => {
  const onMessage = useContext(OnMessageContext);
  
  const config = useMemo<GraphQLSubscriptionConfig<MessageAddedSubscription>>(
    () => ({
      subscription: messageAddedSubscription,
      updater: (store) => {
        store.invalidateStore()
        if (onMessage) {
          onMessage();
        }        
      },
      variables,
    }),
    [variables],
  );

  useSubscription(config);
}
