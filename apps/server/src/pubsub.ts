import { PubSub } from "graphql-subscriptions";

export const events = {
  message: {
    added: `MESSAGE:ADDED`
  }
}

export const pubsub = new PubSub();
