"use client";

import {
  RoomListQuery,
  RoomListQuery$data,
} from "@/__generated__/RoomListQuery.graphql";
import { Search, Avatar } from "@/components";
import { useRouter } from "next/navigation";
import {
  PreloadedQuery,
  graphql,
  usePreloadedQuery,
  useQueryLoader,
} from "react-relay";

const roomListQuery = graphql`
  query RoomListQuery {
    rooms {
      edges {
        node {
          id
          participants {
            id
            username
          }
          messages {
            id
            content
          }
        }
      }
    }
  }
`;

type Room = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<NonNullable<RoomListQuery$data["rooms"]>>["edges"]
    >[0]
  >["node"]
>;

const Room = ({ room, router }: { room: Room; router }) => {
  const handleClick = () => router.push(`/messages/${room.id}`);

  return (
    <button
      onClick={handleClick}
      className="flex items-center hover:bg-zinc-100/80 p-2 rounded-xl gap-2 text-left"
    >
      <Avatar />
      <div className="flex flex-col">
        <span className="font-medium"></span>
        <p className="text-zinc-800">last room message preview</p>
      </div>
    </button>
  );
};

const Rooms = ({ queryRef }: { queryRef: PreloadedQuery<RoomListQuery> }) => {
  const router = useRouter();
  const { rooms } = usePreloadedQuery<RoomListQuery>(roomListQuery, queryRef);

  return (
    <>
      {rooms.edges?.map((room) => {
        // TODO: check why room is nullable
        if (!room?.node) {
          return "failed to load room";
        }

        return <Room room={room.node} router={router} />;
      })}
    </>
  );
};

export const RoomList = () => {
  const [queryRef] = useQueryLoader<RoomListQuery>(roomListQuery);

  return (
    <section className="min-w-64 max-w-md lg:w-[33vw] xl:w-[25vw] bg-white shadow py-2 flex flex-col gap-2 h-screen z-10">
      <div className="px-3">
        <Search />
      </div>
      <div className="h-full max-h-full flex flex-col overflow-y-auto px-3">
        {queryRef && <Rooms queryRef={queryRef} />}
      </div>
    </section>
  );
};
