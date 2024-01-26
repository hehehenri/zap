import { UserDefinition } from "../user/UserModel";
import { RoomDefinition } from "./RoomModel";

export const isParticipant = (room: RoomDefinition, user: UserDefinition) => {
  return !! (
    room.participants
    .filter(partId => partId.toString() == user._id.toString())
    .length
  );
}
