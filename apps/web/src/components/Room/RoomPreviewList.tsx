import { Search } from "@/components";
import { graphql, useFragment } from "react-relay";
import { RoomPreview } from "./RoomPreview";
import { RoomPreviewListFragment$key } from "@/__generated__/RoomPreviewListFragment.graphql";
import NoMessages from "../EmptyState/NoMessages";

const roomPreviewListFragment = graphql`
  fragment RoomPreviewListFragment on RoomConnection {
    edges {
      node {
        id
        ...RoomPreviewFragment
      }
    }
  }
`;

const EmptyState = () => {
  return (
    <div className="w-full px-4 flex items-center h-full justify-center flex-col">
      <NoMessages />
      <p className="text-lg font-semibold">No Messages</p>
      <p className="text-zinc-600">You have no active chats</p>
    </div>
  );
};

export const RoomPreviewList = ({
  fragmentRef,
}: {
  fragmentRef: RoomPreviewListFragment$key;
}) => {
  const data = useFragment(roomPreviewListFragment, fragmentRef);
  const { edges } = data;

  return (
    <section className="relative min-w-64 max-w-md lg:w-[33vw] xl:w-[25vw] bg-white shadow py-2.5 flex flex-col gap-2 h-screen z-10">
      <div className="px-3">
        <Search />
      </div>
      {edges && edges.length > 0 ? (
        <div className="h-full max-h-full flex flex-col overflow-y-auto px-3">
          {edges.map((edge) => {
            const room = edge?.node;
            if (!room) return;

            return <RoomPreview key={room.id} fragmentKey={room} />;
          })}
        </div>
      ) : (
        <EmptyState />
      )}
    </section>
  );
};
