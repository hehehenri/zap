import { RoomDocument, RoomModel } from "./RoomModel";

type Fields = Pick<RoomDocument, Exclude<keyof RoomDocument, "_id">>

export const createRoom = async (fields?: DeepPartial<Fields>) => {
  return await new RoomModel(fields).save();
}
