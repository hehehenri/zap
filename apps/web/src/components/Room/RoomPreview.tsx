import { PreviewFragment$key } from "@/__generated__/PreviewFragment.graphql";
import { Avatar } from "@/components";
import { graphql, useFragment } from "react-relay";

const roomPreviewFragment = graphql`
  fragment RoomPreviewFragment on Room {
    id
    participants {
      id
      username
    }
    updatedAt
  }
`;

export const RoomPreview = ({
  fragmentKey,
}: {
  fragmentKey: PreviewFragment$key;
}) => {
  const { id, participants, updatedAt } = useFragment(
    roomPreviewFragment,
    fragmentKey,
  );

  const firstParticipant = participants[0];

  if (!firstParticipant) return;

  return (
    <a
      href={`/messages/${id}`}
      className="flex items-center hover:bg-zinc-100/80 p-2 rounded-xl gap-2 text-left"
    >
      <Avatar />
      <div className="flex flex-col">
        <span className="font-medium">{firstParticipant.username}</span>
        <p className="text-zinc-800">{updatedAt.toString()}</p>
      </div>
    </a>
  );
};
