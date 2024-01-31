"use client";

import { graphql, useLazyLoadQuery } from "react-relay";
import { useParams } from "next/navigation";
import { pageRoomMessagesQuery } from "@/__generated__/pageRoomMessagesQuery.graphql";
import { RoomPreviewList } from "@/components/room/RoomList";
import { MessagesHeader } from "@/components/messages/Header";
import { RoomMessages } from "@/components/RoomMessages";
import { decode } from "punycode";

const RoomMessagesQuery = graphql`
  query pageRoomMessagesQuery($roomId: ID!) {
    ...RoomListQuery
    ...RoomMessagesMessagesQuery
    ...RoomMessagesQuery @arguments(roomId: $roomId)
    ...HeaderQuery @arguments(roomId: $roomId)
  }
`;

const RoomMessagesPage = () => {
  const { roomId: roomIdParam } = useParams<{ roomId: string }>();
  const roomId = decodeURIComponent(roomIdParam);

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
        {/* <MessagesHeader queryRef={queryRef} /> */}
        <RoomMessages queryRef={queryRef} roomId={roomId} />
      </div>
    </main>
  );
};

export default RoomMessagesPage;
