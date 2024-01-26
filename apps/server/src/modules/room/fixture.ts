import { RoomDefinition, RoomModel } from "./RoomModel";

type Fields = Pick<RoomDefinition, Exclude<keyof RoomDefinition, "_id">>

export const createRoom = async (fields?: DeepPartial<Fields>) => {
  return await new RoomModel(fields).save();
}
