import { graphql } from "relay-runtime";

export const MessageFragment = graphql`
  fragment MessageFragment on Message {
    id
    content
    sender {
      id
      username
    }
    sentAt
  }
`;
