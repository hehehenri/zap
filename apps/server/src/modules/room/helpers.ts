import { UserDocument } from "../user/UserModel";
import { RoomDocument } from "./RoomModel";

export const isRoomMember = (room: RoomDocument, user: UserDocument) => {
  return room
    .participants
    .map(u => u._id.toString())
    .includes(user._id.toString());
}
