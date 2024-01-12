"use client";

import { RoomPreviewList } from "@/components/Room/RoomPreviewList";
import {
  QueryRenderer,
  graphql,
  loadQuery,
  usePreloadedQuery,
} from "react-relay";
import env from "@/relay/environment";
import { NewRoom } from "@/components";
import {
  pageMessagesQuery,
  pageMessagesQuery$data,
} from "@/__generated__/pageMessagesQuery.graphql";

const query = graphql`
  query pageMessagesQuery {
    rooms {
      ...RoomPreviewListFragment
    }
    users {
      ...NewRoomUserConnectionFragment
    }
  }
`;

const queryRef = loadQuery<pageMessagesQuery>(env, query, {});

const ChatEmptyState = ({ queryRef }: { queryRef: pageMessagesQuery$data }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="space-y-5">
        <div className="max-w-md">
          <h1 className="font-mono text-5xl font-semibold text-secondary-400">
            Select a message
          </h1>
          <p className="text-lg text-secondary-950/60">
            Choose from your existing conversations, start a new one, or just
            keep swimming.
          </p>
        </div>
        <NewRoom fragmentKey={queryRef.users} />
      </div>
    </div>
  );
};

const Messages = () => {
  const data = usePreloadedQuery<pageMessagesQuery>(query, queryRef);

  return (
    <main className="grid grid-cols-[auto_1fr] h-full">
      <RoomPreviewList fragmentRef={data.rooms} />
      <ChatEmptyState queryRef={data} />
    </main>
  );
};

export default Messages;
