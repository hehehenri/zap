import { getOtherParticipant } from "@/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import { Avatar } from "../Avatar";
import { HeaderQuery$key } from "@/__generated__/HeaderQuery.graphql";

export const MessagesHeader = ({
  queryRef,
}: {
  queryRef: HeaderQuery$key;
}) => {
  const { room, me } = useFragment(
    graphql`
      fragment HeaderQuery on Query
      @argumentDefinitions(roomId: { type: "ID!" }) {
        room(roomId: $roomId) {
          participants {
            id
            username
          }
        }
        me {
          id
          username
        }
      }
    `,
    queryRef,
  );

  if (!room?.participants || !me) return;

  const otherParticipant = getOtherParticipant(room.participants, me);

  if (!otherParticipant) return;

  return (
    <div className="flex items-center bg-white shadow px-6 py-2 gap-2">
      <Link href={"/messages"} className="p-2 lg:hidden">
        <ArrowLeft className="text-stone-600" />
      </Link>
      <Avatar />
      <div className="flex flex-col">
        <span className="text-lg font-semibold leading-tight">
          {otherParticipant.username}
        </span>
      </div>
    </div>
  );
};
