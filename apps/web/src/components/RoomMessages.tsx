"use client";

import { SendHorizonal } from "lucide-react";
import { graphql, useFragment, useMutation } from "react-relay";
import { RefObject, useEffect, useRef, useState } from "react";
import {
  sendMessageHandler,
  storeMessageMutation,
  useStoreMessageForm,
} from "./messages/StoreMessage";
import { InvalidMessageDialog } from "./messages/InvalidMessageDialog";
import { StoreMessageMutation } from "@/__generated__/StoreMessageMutation.graphql";
import { MessagesQuery$key } from "@/__generated__/MessagesQuery.graphql";
import { Messages } from "./messages/Messages";

const scrollToBottom = (divRef: RefObject<HTMLDivElement>) => {
  const div = divRef.current;
  if (!div) return;

  div.scrollTo({
    top: div.scrollHeight,
    behavior: "smooth",
  });
};

export const RoomMessages = ({
  roomId,
  queryRef,
}: {
  roomId: string;
  queryRef: MessagesQuery$key;
}) => {
  const [pendingMessages, setPendingMessages] = useState<string[]>([]);

  const [commitMutation] =
    useMutation<StoreMessageMutation>(storeMessageMutation);
  const [validationError, setValidationError] = useState<string | null>(null);

  const { register, handleSubmit, setValue } = useStoreMessageForm({ roomId });
  const messagesRef = useRef<HTMLDivElement>(null);

  const onSent = (message: string) => {
    setPendingMessages((messages) => [...messages, message]);
    setValue("content", "");
  };
  const onValidationError = (error: string) => {
    setValidationError(error);
  };

  const sendMessage = sendMessageHandler({
    commitMutation,
    onValidationError,
    onSent,
  });

  useEffect(() => {
    scrollToBottom(messagesRef);
  }, [pendingMessages, messagesRef]);

  return (
    <>
      <form className="w-full" onSubmit={handleSubmit(sendMessage)}>
        <div
          className="
            h-[calc(100vh-64px)] mx-auto max-w-3xl px-4 sm:px-6 lg:px-8
            container flex justify-end flex-col gap-y-1.5
          "
        >
          <div className="max-h-full overflow-y-auto" ref={messagesRef}>
            <Messages queryRef={queryRef} roomId={roomId} />
          </div>

          <div className="w-full pt-2 pb-4 flex items-center gap-2.5">
            <input
              placeholder="Message"
              autoCapitalize="off"
              autoComplete="off"
              className="rounded-2xl shadow px-6 py-3.5 w-full tracking-wide outline-none"
              {...register("content")}
            />
            <button
              type="submit"
              disabled={Boolean(validationError)}
              className="bg-white p-3.5 shadow rounded-full text-secondary-400 hover:bg-secondary-400 hover:text-white"
            >
              <SendHorizonal />
            </button>
          </div>
        </div>
        <div
          style={{ mask: "url('/img/bg-tile.svg')" }}
          className="h-full w-full bg-secondary-500 absolute top-0 -z-10 opacity-30"
        />
      </form>
      <InvalidMessageDialog
        error={validationError}
        setError={setValidationError}
      />
    </>
  );
};
