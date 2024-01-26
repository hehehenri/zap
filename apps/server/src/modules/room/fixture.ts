import { RoomDefinition, RoomModel } from "./RoomModel";

type Fields = Pick<RoomDefinition, Exclude<keyof RoomDefinition, "_id">>

export const createRoom = (fields?: DeepPartial<Fields>) => {
  return new RoomModel(fields).save();
}
