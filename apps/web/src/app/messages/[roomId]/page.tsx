"use client";

import { MessagesHeader, RoomMessages } from "@/components";
import { RoomPreviewList } from "@/components/Room/RoomPreviewList";
import { graphql, useLazyLoadQuery } from "react-relay";
import { useParams } from "next/navigation";
import { pageRoomMessagesQuery } from "@/__generated__/pageRoomMessagesQuery.graphql";
import Image from "next/image";

const RoomMessagesQuery = graphql`
  query pageRoomMessagesQuery($roomId: ID!) {
    rooms {
      ...RoomPreviewListFragment
    }
    roomMessages(roomId: $roomId) {
      ...RoomMessagesListFragment
    }
  }
`;

const RoomMessagesPage = () => {
  const { roomId } = useParams<{ roomId: string }>();

  // TODO: discover how to use usePreloadedQuery hook instead
  const { rooms, roomMessages } = useLazyLoadQuery<pageRoomMessagesQuery>(
    RoomMessagesQuery,
    { roomId },
  );

  return (
    <main className="grid grid-cols-[auto_1fr]">
      <RoomPreviewList fragmentRef={rooms} />
      <div
        className="
          flex flex-col h-screen relative
        "
      >
        <MessagesHeader />
        <RoomMessages messagesFragment={roomMessages} roomId={roomId} />
        <div
          className="
          bg-gradient-to-br from-amber-100 to-amber-50
          absolute w-full h-full -z-20"
        />
      </div>
    </main>
  );
};

export default RoomMessagesPage;
