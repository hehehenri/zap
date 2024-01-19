import { PubSub } from "graphql-subscriptions";

export const EVENTS = {
  MESSAGE: { ADDED: "MESSAGE:ADDED" }
} as const;

export const pubsub = new PubSub();
