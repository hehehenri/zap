
import request from "supertest";
import { createApp } from "../../../../app";
import { generateToken } from "../../../../authentication";
import { createUser } from "../../../user/fixture";
import mongoose from "mongoose";
import { describeWithDb } from "../../../../test/helpers";
import { createRoom } from "../../fixture";

const query = (userId: mongoose.Types.ObjectId) => {
  return {
    query: `
      mutation GetCreateRoom($userId: ID!) {
        getOrCreateRoom(input: { userId: $userId}) {
          room { participants { username } }
        }
      }
    `,
    variables: { userId }
  }
}

describeWithDb('room/mutations/getOrCreateRoom', () => {  
  it("should create room if it doesn't exist yet", async () => {
    const username = "createroomusername";
    const authUser = await createUser({ username});
    const token = generateToken(authUser);

    const peer = await createUser({ username: "createroompeerusername" });

    const payload = query(peer._id);
    const response = await request(createApp().callback())
      .post("/graphql")
      .set({
        Accept: "application/json",
        'Content-Type': "application/json",
        Authorization: `Bearer ${token}`
      })
      .send(JSON.stringify(payload));

    const participants = response
      .body
      .data
      .getOrCreateRoom
      .room
      .participants;

    expect(response.status).toBe(200);
    expect(participants.length).toBe(2);

    expect(participants.includes(authUser.username));
    expect(participants.includes(peer.username));
  });

  it("should return room if it already exists", async () => {
    const username = "createroomusername";
    const authUser = await createUser({ username});
    const token = generateToken(authUser);

    const peer = await createUser({ username: "createroompeerusername" });

    await createRoom({ participants: [authUser, peer] })

    const payload = query(peer._id);
    const response = await request(createApp().callback())
      .post("/graphql")
      .set({
        Accept: "application/json",
        'Content-Type': "application/json",
        Authorization: `Bearer ${token}`
      })
      .send(JSON.stringify(payload));

    const participants = response
      .body
      .data
      .getOrCreateRoom
      .room
      .participants;

    expect(response.status).toBe(200);
    expect(participants.length).toBe(2);

    expect(participants.includes(authUser.username));
    expect(participants.includes(peer.username));
  });

  it(
    "should return unauthorized error when token is not provided",
    async () => {
      const payload = {
        query: `
          query Me {
            me { username }
          }
        `,
        variables: {}
      };

      const response = await request(createApp().callback())
        .post("/graphql")
        .set({
          Accept: "application/json",
          'Content-Type': "application/json",
        })
        .send(JSON.stringify(payload));

      expect(response.status).toBe(401);
      expect(response.body.errors[0].message).toBe("User not authorized")
    }
  );  
});
