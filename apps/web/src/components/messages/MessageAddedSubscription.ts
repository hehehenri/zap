import { MessageAddedSubscription } from "@/__generated__/MessageAddedSubscription.graphql";
import { useMemo } from "react";
import { useSubscription } from "react-relay";
import { GraphQLSubscriptionConfig, graphql } from "relay-runtime";

const messageAddedSubscription = graphql`
  subscription MessageAddedSubscription($input: MessageAddedInput!) {
    messageAddedSubscribe(input: $input) {
      message {
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
`

export type MessageResponse = {
  id: string,
  content: string,
}

// TODO: cannot useFragment inside onMessage because of rule-of-hooks :(
type MessagePayload = {
  id: string,
  content: string,
  sender: {
    id: string,
    username: string,
  },
  sentAt: string,
}

type SubscriptionConfig = {
  roomId: string,
  onMessage: (message: MessagePayload) => void
};

export const useMessageAddedSubscription = ({roomId, onMessage}: SubscriptionConfig) => {
  const config = useMemo<GraphQLSubscriptionConfig<MessageAddedSubscription>>(
    () => ({
      subscription: messageAddedSubscription,
      variables: { input: { roomId } },
      onNext: (res) => {
        const message = res?.messageAddedSubscribe?.message;
        if (!message) return;

        onMessage(message);
      }
    }),
    [roomId, onMessage]
  );

  useSubscription(config);
}
