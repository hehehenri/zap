import { UserDefinition } from "../user/UserModel";
import { RoomDefinition } from "./RoomModel";

export const isRoomMember = (room: RoomDefinition, user: UserDefinition) => {
  return room
    .participants
    .map(u => u._id.toString())
    .includes(user._id.toString());
}
