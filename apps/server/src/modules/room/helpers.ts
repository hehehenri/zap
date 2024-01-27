import { UserDocument } from "../user/UserModel";
import { RoomDefinition } from "./RoomModel";

export const isRoomMember = (room: RoomDefinition, user: UserDocument) => {
  return room
    .participants
    .map(u => u._id.toString())
    .includes(user._id.toString());
}
