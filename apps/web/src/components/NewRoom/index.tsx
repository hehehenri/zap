"use client";

import { useState } from "react";

import Dialog from "../Dialog";
import { useFragment } from "react-relay";
import { graphql } from "react-relay";
import { NewRoomUserFragment$key } from "@/__generated__/NewRoomUserFragment.graphql";
import { NewRoomUserConnectionFragment$key } from "@/__generated__/NewRoomUserConnectionFragment.graphql";

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

  return <div>{user.username}</div>;
};

const userConnectionFragment = graphql`
  fragment NewRoomUserConnectionFragment on UserConnection {
    edges {
      node {
        id
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
  const [isOpen, setIsOpen] = useState(true);
  const data = useFragment(userConnectionFragment, fragmentKey);
  console.log(data);
  if (!data) return;

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-secondary-400 px-8 py-3 rounded-full text-2xl text-white font-bold"
      >
        New Message
      </button>
      <Dialog title={"New Message"} open={isOpen} onOpenChange={setIsOpen}>
        {data.edges?.map((edge) => {
          const user = edge?.node;

          if (!user) return;

          return <UserPreview key={user.id} fragmentKey={user} />;
        })}
        <div>ayoo</div>
      </Dialog>
    </div>
  );
};
