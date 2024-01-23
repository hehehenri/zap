"use client";

import Dialog from "../Dialog";
import { useFragment, useMutation } from "react-relay";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { graphql } from "react-relay";
import { Avatar } from "..";
import { SearchIcon } from "lucide-react";
import { NewRoomMutation } from "@/__generated__/NewRoomMutation.graphql";
import { extractNodes } from "@/utils";
import { NewRoomQuery$key } from "@/__generated__/NewRoomQuery.graphql";
import { User } from "@/auth";

const Header = () => {
  return (
    <div className="px-10">
      <p>New Message</p>
    </div>
  );
};

const UserPreview = ({ user }: { user: User }) => {
  const router = useRouter();
  const [commitMutation] = useMutation<NewRoomMutation>(graphql`
    mutation NewRoomMutation($participants: GetOrCreateRoomInput!) {
      getOrCreateRoom(input: $participants) {
        room {
          id
        }
      }
    }
  `);

  const onClick = () => {
    const variables = { participants: { userId: user.id } };

    commitMutation({
      variables,
      onCompleted: ({ getOrCreateRoom }) => {
        const room = getOrCreateRoom?.room;
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
  fragment NewRoomQuery on Query
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 30 }
    after: { type: "String" }
  ) {
    users(first: $first, after: $after)
      @connection(key: "NewRoom_users", filters: []) {
      edges {
        node {
          id
          username
        }
      }
    }
  }
`;

export const NewRoom = ({
  fragmentKey,
  children,
}: {
  fragmentKey: NewRoomQuery$key;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { users: maybeUsers } = useFragment(
    userConnectionFragment,
    fragmentKey,
  );

  const users = extractNodes(maybeUsers);

  return (
    <div className="w-full">
      <button onClick={() => setIsOpen(true)}>{children}</button>
      <Dialog
        title={<Header />}
        open={isOpen}
        onOpenChange={setIsOpen}
        className="px-0 pb-0 pt-6"
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
          {users
            ?.filter((user) =>
              search.length > 0 ? user.username.startsWith(search) : true,
            )
            .map((user) => {
              return <UserPreview key={user.id} user={user} />;
            })}
        </div>
      </Dialog>
    </div>
  );
};
