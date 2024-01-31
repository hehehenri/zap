import { RoomPreviewFragment$key } from "@/__generated__/RoomPreviewFragment.graphql";
import { useUser } from "@/hooks/useUser";
import { getOtherParticipant } from "@/utils";
import { graphql, useFragment } from "react-relay";
import { Avatar } from "../Avatar";

const roomPreviewFragment = graphql`
  fragment RoomPreviewFragment on Room {
    id
    participants {
      id
      username
    }
    lastMessage {
      content
      sentAt
    }
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
    hour12: false,
    minute: "2-digit",
  });
}

export const RoomPreview = ({
  roomFragmentKey,
}: {
  roomFragmentKey: RoomPreviewFragment$key;
}) => {
  const data = useFragment(roomPreviewFragment, roomFragmentKey);
  const user = useUser();
  if (!user) return;

  const part = getOtherParticipant(data.participants, user);
  if (!part) return;

  const { id } = data;

  return (
    <a
      href={`/messages/${id}`}
      className="flex items-center hover:bg-zinc-100/80 p-2 rounded-xl gap-2 text-left"
    >
      <Avatar />
      <div className="flex justify-between w-full items-center overflow-hidden">
        <div className="flex flex-col leading-6 overflow-hidden">
          <span className="font-medium overflow-hidden text-ellipsis">{part.username}</span>
          <p className="text-stone-600 overflow-hidden text-ellipsis">{data.lastMessage?.content}</p>
        </div>
        {data.lastMessage && (
          <p className="text-stone-700 text-xs">
            {formatReadableDate(data.lastMessage?.sentAt)}
          </p>
        )}
      </div>
    </a>
  );
};
