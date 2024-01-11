"use client";

import { pageQuery } from "@/__generated__/pageQuery.graphql";
import { Messages, MessagesHeader } from "@/components";
import { RoomPreviewList } from "@/components/Room/RoomPreviewList";
import { env } from "@/relay/env";
import { graphql, loadQuery, usePreloadedQuery } from "react-relay";

const pageQuery = graphql`
  query pageQuery {
    rooms {
      ...RoomPreviewListFragment
    }
  }
`;

const queryRef = loadQuery<pageQuery>(env, pageQuery, {});

const RoomMessages = () => {
  const { rooms } = usePreloadedQuery<pageQuery>(pageQuery, queryRef);

  return (
    <main className="grid grid-cols-[auto_1fr]">
      <RoomPreviewList fragmentRef={rooms} />
      <div className="flex flex-col h-screen">
        <MessagesHeader />
        <Messages />
      </div>
    </main>
  );
};

export default RoomMessages;
