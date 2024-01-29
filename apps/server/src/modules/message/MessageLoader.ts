import { createLoader } from "@entria/graphql-mongo-helpers";
import { MessageModel } from "./MessageModel";

export const MessageLoader = createLoader({
  model: MessageModel,
  loaderName: 'MessageLoader',
  defaultSort: { createdAt: -1}
})

