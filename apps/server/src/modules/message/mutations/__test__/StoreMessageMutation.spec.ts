import { toGlobalId } from "graphql-relay";
import { generateToken } from "../../../../authentication";
import { describeWithDb, testQuery } from "../../../../test/helpers";
import { createRoom } from "../../../room/fixture";
import { createUser } from "../../../user/fixture";

const query = ({ content, roomId }: { content?: string, roomId: string }) => ({
  query: `
    mutation StoreMessage($content: String! $roomId: String!) {
      storeMessage(input: { content: $content roomId: $roomId}) {
        message {
          node { content }
        }
      }
    }
  `,
  variables: {
    content: content ?? 'message content',
    roomId,
  },
});

describeWithDb("message/mutations/storeMessage", () => {
  it("should add message to room", async () => {
    const userA = await createUser({ username: 'usera' });
    const userB = await createUser({ username: 'userb' });

    const roomAB = await createRoom({ participants: [userA, userB] })
    const roomId = toGlobalId("Room", roomAB._id);

    const token = generateToken(userA);
    const response = await testQuery({ query: query({ roomId }), token });

    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data).toMatchSnapshot();
  });

  it("can't add message to room when not a member", async () => {
    const userA = await createUser({ username: 'usera' });
    const userB = await createUser({ username: 'userb' });
    const userC = await createUser({ username: 'userc' });

    const roomBC = await createRoom({ participants: [userB, userC] })
    const roomId = toGlobalId("Room", roomBC._id);

    const token = generateToken(userA);
    const response = await testQuery({ query: query({ roomId }), token });

    expect(response.status).toBe(422);
    expect(response.body.errors).toMatchSnapshot();
  });
})
