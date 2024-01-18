import {
  RoomPreviewFragment$data,
  RoomPreviewFragment$key,
} from "@/__generated__/RoomPreviewFragment.graphql";
import { User } from "@/auth";
import { Avatar } from "@/components";
import { useUser } from "@/hooks/useUser";
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

const getOtherPeer = (
  { participants }: RoomPreviewFragment$data,
  user: User,
) => {
  if (!user) return null;

  const firstPeer = participants[0];
  const secondPeer = participants[1];

  if (firstPeer?.id == user.id) return secondPeer;
  if (secondPeer?.id == user.id) return firstPeer;

  return null;
};

export const RoomPreview = ({
  fragmentKey,
}: {
  fragmentKey: RoomPreviewFragment$key;
}) => {
  const data = useFragment(roomPreviewFragment, fragmentKey);
  const user = useUser();
  if (!user) return;

  const peer = getOtherPeer(data, user);
  if (!peer) return;

  const { id, updatedAt } = data;

  return (
    <a
      href={`/messages/${id}`}
      className="flex items-center hover:bg-zinc-100/80 p-2 rounded-xl gap-2 text-left"
    >
      <Avatar />
      <div className="flex justify-between w-full items-center">
        <span className="font-medium text-ellipsis">{peer.username}</span>
        <p className="text-zinc-800">{formatReadableDate(updatedAt)}</p>
      </div>
    </a>
  );
};
