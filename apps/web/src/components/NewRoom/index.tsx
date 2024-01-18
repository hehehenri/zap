"use client";

import Dialog from "../Dialog";
import { useFragment, useMutation } from "react-relay";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { graphql } from "react-relay";
import { NewRoomUserFragment$key } from "@/__generated__/NewRoomUserFragment.graphql";
import { NewRoomUserConnectionFragment$key } from "@/__generated__/NewRoomUserConnectionFragment.graphql";
import { Avatar } from "..";
import { SearchIcon } from "lucide-react";
import { NewRoomMutation } from "@/__generated__/NewRoomMutation.graphql";

const Header = () => {
  return (
    <div className="px-10">
      <p>New Message</p>
    </div>
  );
};

const newRoomMutation = graphql`
  mutation NewRoomMutation($participants: GetOrCreateRoomInput!) {
    getOrCreateRoom(input: $participants) {
      room {
        id
      }
    }
  }
`;

const userFragment = graphql`
  fragment NewRoomUserFragment on User {
    id
    username
  }
`;

const UserPreview = ({
  fragmentKey,
}: {
  fragmentKey: NewRoomUserFragment$key;
}) => {
  const user = useFragment(userFragment, fragmentKey);
  const router = useRouter();
  const [commitMutation] = useMutation<NewRoomMutation>(newRoomMutation);

  const onClick = () => {
    const variables = { participants: { userId: user.id } };

    commitMutation({
      variables,
      onCompleted: ({ createRoom }) => {
        const room = createRoom?.room;
        if (!room) {
          throw new Error("failed to create room");
        }

        router.push(`/messages/${room?.id}`);
      },
    });
  };

  return (
    <button
      onClick={() => onClick()}
      className="px-10 py-4 flex items-center gap-2 hover:bg-zinc-50 w-full"
    >
      <Avatar />
      <span>{user.username}</span>
    </button>
  );
};

const userConnectionFragment = graphql`
  fragment NewRoomUserConnectionFragment on UserConnection {
    edges {
      node {
        id
        username
        ...NewRoomUserFragment
      }
    }
  }
`;

export const NewRoom = ({
  fragmentKey,
}: {
  fragmentKey: NewRoomUserConnectionFragment$key;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const data = useFragment(userConnectionFragment, fragmentKey);

  if (!data) return;

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-secondary-400 px-8 py-3 rounded-full text-2xl text-white font-bold"
      >
        New Message
      </button>
      <Dialog
        title={<Header />}
        open={isOpen}
        onOpenChange={setIsOpen}
        className="pt-6 pb-0 px-0"
      >
        <div className="relative flex items-center mb-2">
          <SearchIcon className="absolute ml-10" strokeWidth={1} />
          <input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search people"
            className="w-full pl-[4.5rem] py-2 border-b border-b-secondary-200 outline-none placeholder-zinc-500 tracking-wide"
          />
        </div>
        <div className="h-[25rem] w-full overflow-y-auto">
          {data.edges
            ?.filter((edge) =>
              search.length > 0
                ? edge?.node?.username.startsWith(search)
                : true,
            )
            .map((edge) => {
              const user = edge?.node;
              if (!user) return;

              return <UserPreview key={user.id} fragmentKey={user} />;
            })}
        </div>
      </Dialog>
    </div>
  );
};
