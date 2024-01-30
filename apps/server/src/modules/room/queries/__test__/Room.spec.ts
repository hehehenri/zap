
import { generateToken } from "../../../../authentication";
import { describeWithDb, testQuery } from "../../../../test/helpers";
import { createUser } from "../../../user/fixture";
import { createRoom } from "../../fixture";
import { RoomDocument } from "../../RoomModel";

const query = (room: RoomDocument) => ({
  query: `
    query Room($roomId: ID!) {
      room(roomId: $roomId) {
        participants { username }
      }
    }
  `,
  variables: { roomId: room._id }
})

describeWithDb("room/queries/room", () => {
  it("should return room", async () => {
    const userA = await createUser({ username: "roomusera" });
    const userB = await createUser({ username: "roomuserb" });

    const room = await createRoom({ participants: [userA, userB] });

    const token = generateToken(userA);

    const response = await testQuery({ query: query(room), token });

    expect(response.status).toBe(200);
    expect(response.body.data).toMatchSnapshot();
  });

  
  it("should not return room if user is not a member", async () => {
    const userA = await createUser({ username: "roomsusera" });
    const userB = await createUser({ username: "roomsuserb" });
    const userC = await createUser({ username: "roomsuserc" });

    const roomBC = await createRoom({ participants: [userB, userC] });

    const token = generateToken(userA);

    const response = await testQuery({ query: query(roomBC), token });

    expect(response.status).toBe(422);
  });
});
