import { RoomPreviewFragment$key } from "@/__generated__/RoomPreviewFragment.graphql";
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

function formatReadableDate(inputDate: string) {
  const currentDate = new Date();
  const date = new Date(inputDate);

  if (currentDate.getFullYear() !== date.getFullYear()) {
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`; // Jan 1, 2024
  }

  if (currentDate.getMonth() !== date.getMonth()) {
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();

    return `${month} ${day}`; // Jan 1
  }

  if (currentDate.getDay() !== date.getDay()) {
    return date.toLocaleString("default", { weekday: "short" }); // Mon
  }

  // 22:34
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export const RoomPreview = ({
  fragmentKey,
}: {
  fragmentKey: RoomPreviewFragment$key;
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
      <div className="flex justify-between w-full items-center">
        <span className="font-medium text-ellipsis">
          {firstParticipant.username}
        </span>
        <p className="text-zinc-800">{formatReadableDate(updatedAt)}</p>
      </div>
    </a>
  );
};
