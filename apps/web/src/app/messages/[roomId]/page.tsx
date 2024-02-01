"use client";

import { FetchPolicy, graphql, useLazyLoadQuery } from "react-relay";
import { useParams } from "next/navigation";
import { pageRoomMessagesQuery } from "@/__generated__/pageRoomMessagesQuery.graphql";
import { RoomPreviewList } from "@/components/room/RoomList";
import { MessagesHeader } from "@/components/messages/Header";
import { RoomMessages } from "@/components/RoomMessages";
import { useCallback, useState } from "react";
import { OnMessageContext } from "@/components/messages/MessageAddedSubscription";

const RoomMessagesQuery = graphql`
  query pageRoomMessagesQuery($roomId: ID!) {
    ...RoomListQuery
    ...MessagesQuery @arguments(roomId: $roomId)
    ...HeaderQuery @arguments(roomId: $roomId)
  }
`;

const RoomMessagesPage = () => {
  const { roomId: roomIdParam } = useParams<{ roomId: string }>();
  const roomId = decodeURIComponent(roomIdParam);
  const [queryOptions, setQueryOptions] = useState<{
    fetchKey: number;
    fetchPolicy: FetchPolicy;
  } | null>(null);

  const refresh = useCallback(() => {
    setQueryOptions((prev) => ({
      fetchKey: (prev?.fetchKey ?? 0) + 1,
      fetchPolicy: "network-only",
    }));
  }, []);

  const queryRef = useLazyLoadQuery<pageRoomMessagesQuery>(
    RoomMessagesQuery,
    {
      roomId,
    },
    queryOptions ?? {},
  );

  return (
    <main className="grid grid-cols-[auto_1fr]">
      <div className="hidden lg:block">
        <RoomPreviewList fragmentRef={queryRef} />
      </div>
      <div
        className="
          flex flex-col h-screen relative col-span-full lg:col-span-1
        "
      >
        <OnMessageContext.Provider value={refresh}>
          <MessagesHeader queryRef={queryRef} />
          <RoomMessages queryRef={queryRef} roomId={roomId} />
        </OnMessageContext.Provider>
      </div>
    </main>
  );
};

export default RoomMessagesPage;
