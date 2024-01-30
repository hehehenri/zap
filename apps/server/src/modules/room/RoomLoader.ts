import { createLoader } from "@entria/graphql-mongo-helpers";
import { RoomModel } from "./RoomModel";

export const RoomLoader = createLoader({
  model: RoomModel,
  loaderName: 'RoomLoader',
  defaultSort: {
    lastMessage: -1, "lastMessage.createdAt": 1
  }
})
