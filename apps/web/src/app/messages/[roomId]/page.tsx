"use client";

import { MessagesHeader, RoomMessages } from "@/components";
import { RoomPreviewList } from "@/components/Room/RoomPreviewList";
import { graphql, useLazyLoadQuery } from "react-relay";
import { useParams } from "next/navigation";
import { pageRoomMessagesQuery } from "@/__generated__/pageRoomMessagesQuery.graphql";

const RoomMessagesQuery = graphql`
  query pageRoomMessagesQuery($roomId: ID!) {
    ...RoomPreviewListQuery
    ...RoomMessagesMessagesQuery
    ...RoomMessagesQuery @arguments(roomId: $roomId)
    ...RoomMessagesHeaderQuery @arguments(roomId: $roomId)
  }
`;

const RoomMessagesPage = () => {
  const { roomId } = useParams<{ roomId: string }>();

  const queryRef = useLazyLoadQuery<pageRoomMessagesQuery>(RoomMessagesQuery, {
    roomId,
  });

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
        <MessagesHeader queryRef={queryRef} />
        <RoomMessages queryRef={queryRef} roomId={roomId} />
      </div>
    </main>
  );
};

export default RoomMessagesPage;
