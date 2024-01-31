import { MessagesPaginationQuery } from "@/__generated__/MessagesPaginationQuery.graphql";
import { MessagesQuery$key } from "@/__generated__/MessagesQuery.graphql";
import { extractNodes } from "@/utils";
import { MoreHorizontal } from "lucide-react";
import { graphql } from "relay-runtime";
import { MessageGroup } from "./MessagesGroup";
import { usePaginationFragment } from "react-relay";
import { useMessageAddedSubscription } from "./MessageAddedSubscription";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useEffect, useRef, useState } from "react";

const MessagesQuery = graphql`
  fragment MessagesQuery on Query
  @argumentDefinitions(
    roomId: { type: "ID!" }
    first: { type: "Int", defaultValue: 25 }
    after: { type: "String" }
  )
  @refetchable(queryName: "MessagesPaginationQuery") {
    roomMessages(roomId: $roomId, first: $first, after: $after)
      @connection(key: "messages_roomMessages") {
      __id
      edges {
        node {
          id
          content
          sender {
            id
            username
          }
          sentAt
        }
      }
      pageInfo {
        hasNextPage
      }
    }
    me {
      id
      username
    }
  }
`;

export const Messages = ({
  queryRef,
  roomId,
}: {
  queryRef: MessagesQuery$key;
  roomId: string;
}) => {
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<
    MessagesPaginationQuery,
    MessagesQuery$key
  >(MessagesQuery, queryRef);
  const [hasLoaded, setHasLoaded] = useState(false);

  useMessageAddedSubscription({
    input: { roomId },
    connections: [data.roomMessages?.__id ?? ""],
  });

  const { roomMessages, me: user } = data;

  const loadMore = () => {
    if (isLoadingNext || !hasNext) return;

    loadNext(15);
  };

  const descMessages = extractNodes(roomMessages);
  const messages = descMessages.reverse();

  if (!user) return;

  const [sentryRef] = useInfiniteScroll({
    hasNextPage: hasNext,
    loading: isLoadingNext,
    onLoadMore: loadMore,
    disabled: !hasLoaded,
  });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.scrollIntoView({
      behavior: "smooth",
    });
    setHasLoaded(true);
  }, [data.roomMessages, ref]);

  return (
    <div className="pt-3">
      {hasNext && (
        <div className="flex w-full justify-center pb-3">
          <button
            type="button"
            disabled={isLoadingNext}
            className="py-1 bg-secondary-300 px-3 shadow rounded-full text-stone-800 flex items-center gap-1.5 transition hover:-translate-y-1"
            onClick={loadMore}
          >
            Load more
            <MoreHorizontal size={18} strokeWidth={1} />
          </button>
        </div>
      )}
      <div ref={sentryRef} />
      <MessageGroup messages={messages} user={user} />
      <div ref={ref} />
    </div>
  );
};
