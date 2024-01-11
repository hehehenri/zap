import { Search } from "@/components";
import { graphql, useFragment } from "react-relay";
import { RoomPreview } from "./RoomPreview";
import { RoomPreviewListFragment$key } from "@/__generated__/RoomPreviewListFragment.graphql";

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

export const RoomPreviewList = ({
  fragmentRef,
}: {
  fragmentRef: RoomPreviewListFragment$key;
}) => {
  const data = useFragment(roomPreviewListFragment, fragmentRef);
  if (!data) return;
  const { edges } = data;

  return (
    <section className="relative min-w-64 max-w-md lg:w-[33vw] xl:w-[25vw] bg-white shadow py-2.5 flex flex-col gap-2 h-screen z-10">
      <div className="px-3">
        <Search />
      </div>
      {edges && edges.length > 0 && (
        <div className="h-full max-h-full flex flex-col overflow-y-auto px-3">
          {edges.map((edge) => {
            const room = edge?.node;
            if (!room) return;

            return <RoomPreview key={room.id} fragmentKey={room} />;
          })}
        </div>
      )}
    </section>
  );
};
