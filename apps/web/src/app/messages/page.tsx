"use client";

import { RoomPreviewList } from "@/components/Room/RoomPreviewList";
import { graphql, useLazyLoadQuery } from "react-relay";
import { NewRoom } from "@/components";
import {
  pageMessagesQuery,
  pageMessagesQuery$data,
} from "@/__generated__/pageMessagesQuery.graphql";

const ChatEmptyState = ({ queryRef }: { queryRef: pageMessagesQuery$data }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="space-y-8">
        <div className="max-w-md">
          <h1 className="font-mono text-5xl font-semibold text-secondary-400">
            Select a message
          </h1>
          <p className="text-lg text-secondary-950/60">
            Choose from your existing conversations, start a new one, or just
            keep swimming.
          </p>
        </div>
        <NewRoom fragmentKey={queryRef}>
          <span className="bg-secondary-400 px-8 py-3 rounded-full text-2xl text-white font-bold">
            New Message
          </span>
        </NewRoom>
      </div>
    </div>
  );
};

const Messages = () => {
  const data = useLazyLoadQuery<pageMessagesQuery>(
    graphql`
      query pageMessagesQuery {
        ...RoomPreviewListQuery
        ...NewRoomQuery
      }
    `,
    {},
  );

  return (
    <main className="grid grid-cols-[auto_1fr] h-full">
      <RoomPreviewList fragmentRef={data} />
      <ChatEmptyState queryRef={data} />
    </main>
  );
};

export default Messages;
