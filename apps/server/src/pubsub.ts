import { PubSub } from "graphql-subscriptions";

export const events = {
  message: {
    added: (roomId: string) => `MESSAGE:ADDED:${roomId}`
  }
}

export const pubsub = new PubSub();
