import { graphql, parse, subscribe } from "graphql";
import { describeWithDb, testQuery } from "../../../../test/helpers";
import schema from "@/schemas";
import { createRoom } from "@/modules/room/fixture";
import { createUser } from "@/modules/user/fixture";
import { initialContext } from "@/context";

const storeMessageMutation = ({ roomId, content }: { roomId: string, content: string}) => ({
  query: `
    mutation StoreMessage($content: String! $roomId: String) {
     storeMessage(input: {content: $content roomId: $roomId}) { message { content }}
    }
  `,
  variables: {
    content,
    roomId
  }
});

const messageAddedSubscription = ({ roomId }: { roomId: string}) => ({
  query: `
    subscription MessageAdded($roomId: ID!) {
      messageAddedSubscribe(input: { roomId: $roomId }) {
        message { content }
      }
    }
  `,
  variables: { roomId }
})

describeWithDb('message/subscription/messageAdded', () => {
  it("should receive message when a new message is published", async () => {
    const userA = await createUser({ username: "roomusera" });
    const userB = await createUser({ username: "roomuserb" });

    const room = await createRoom({ participants: [userA, userB] });
    const context = initialContext();

    const mutation = storeMessageMutation({ roomId: room.id, content: 'hello world!' });
    const triggerSubscription = graphql({
      schema,
      source: mutation.query,
      rootValue: {},
      contextValue: context,
      variableValues: mutation.variables
    })

    const subscription = messageAddedSubscription({ roomId: room.id });
    const result = await subscribe({
      schema,
      document: parse(subscription.query),
      rootValue: triggerSubscription,
      contextValue: context,
      variableValues: subscription.variables
    })

    console.log(result);
  })
})
