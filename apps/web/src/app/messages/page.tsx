"use client";

import { graphql, useLazyLoadQuery } from "react-relay";
import {
  pageMessagesQuery,
  pageMessagesQuery$data,
} from "@/__generated__/pageMessagesQuery.graphql";
import { NewRoom } from "@/components/room/NewRoom";
import { RoomPreviewList } from "@/components/room/RoomList";

const ChatEmptyState = ({ queryRef }: { queryRef: pageMessagesQuery$data }) => {
  return (
    <div className="w-full h-full items-center justify-center hidden lg:flex">
      <div className="space-y-8 px-8 min-w-[300px]">
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
        ...RoomListQuery
        ...NewRoomQuery
      }
    `,
    {},
  );

  return (
    <main className="grid grid-cols-[auto_1fr] h-full">
      <div className="col-span-full lg:col-span-1">
        <RoomPreviewList fragmentRef={data} />
      </div>
      <ChatEmptyState queryRef={data} />
    </main>
  );
};

export default Messages;
