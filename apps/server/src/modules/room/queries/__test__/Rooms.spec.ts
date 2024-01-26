import { generateToken } from "../../../../authentication";
import { describeWithDb, testQuery } from "../../../../test/helpers";
import { createUser } from "../../../user/fixture";
import { createRoom } from "../../fixture";

const query = {
  query: `
    query Rooms {
      rooms(first: 2) {
        edges {
          node {
            participants { username }
          }
        }
      }
    }
  `,
  variables: {}
}

describeWithDb("room/queries/rooms", () => {
  it("should return paginated room connections", async () => {
    const userA = await createUser({ username: "roomsusera" });
    const userB = await createUser({ username: "roomsuserb" });
    const userC = await createUser({ username: "roomsuserc" });

    await createRoom({ participants: [userA, userB] });
    await createRoom({ participants: [userA, userC] });

    const token = generateToken(userA);

    const response = await testQuery({ query, token });

    expect(response.status).toBe(200);
    expect(response.body.data).toMatchSnapshot();
  });

  
  it("should not list room if user is not a member", async () => {
    const userA = await createUser({ username: "roomsusera" });
    const userB = await createUser({ username: "roomsuserb" });
    const userC = await createUser({ username: "roomsuserc" });

    await createRoom({ participants: [userB, userC] });

    const token = generateToken(userA);

    const response = await testQuery({ query, token });

    expect(response.status).toBe(200);
    expect(response.body.data).toMatchSnapshot();
  });
});
