"use client";

import { SendHorizonal } from "lucide-react";
import { Avatar } from "..";
import { useForm } from "react-hook-form";
import { commitMutation, graphql, useMutation } from "react-relay";
import {
  MessagesStoreMutation,
  MessagesStoreMutation$data,
} from "@/__generated__/MessagesStoreMutation.graphql";

const Message = ({ content }: { content: string }) => {
  return (
    <div className="bg-white rounded-lg shadow px-2 py-1.5 flex items-end gap-1 w-fit">
      <p className="p-0.5">{content}</p>
      <span className="text-xs text-gray-400">17:44</span>
    </div>
  );
};

export const MessagesHeader = () => {
  return (
    <div className="flex items-center bg-white shadow px-6 py-2 gap-2">
      <Avatar />
      <div className="flex flex-col">
        <span className="text-lg font-semibold leading-tight">username</span>
        <p className="text-sm text-zinc-600 font-medium">
          Last seen yesterday at 17:32
        </p>
      </div>
    </div>
  );
};

const storeMessageMutation = graphql`
  mutation MessagesStoreMutation($input: StoreMessageInput!) {
    storeMessage(input: $input) {
      message {
        id
        content
      }
    }
  }
`;

type FormType = {
  roomId: string;
  content: string;
};

export const Messages = () => {
  const [commitMutation] =
    useMutation<MessagesStoreMutation>(storeMessageMutation);
  const { register, handleSubmit } = useForm<FormType>({
    defaultValues: {
      roomId: "",
      content: "",
    },
  });

  const onSubmit = (variables: FormType) => {
    commitMutation({
      variables,
      onCompleted: (response: MessagesStoreMutation$data) => {
        console.log(response);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-full max-h-full overflow-y-auto mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 container flex justify-end flex-col gap-y-1.5"
    >
      <Message content={"pogchamp kekw omegalul"} />
      <Message content={"pogchamp kekw omegalul"} />
      <Message content={"pogchamp kekw omegalul"} />
      <Message content={"pogchamp kekw omegalul"} />
      <Message content={"pogchamp kekw omegalul"} />
      <Message content={"pogchamp kekw omegalul"} />
      <Message content={"pogchamp kekw omegalul"} />
      <Message content={"pogchamp kekw omegalul"} />
      <Message content={"pogchamp kekw omegalul"} />
      <Message content={"pogchamp kekw omegalul"} />
      <Message content={"pogchamp kekw omegalul"} />
      <Message content={"pogchamp kekw omegalul"} />

      <div className="w-full pt-2 pb-4 flex items-center gap-2.5">
        <input
          placeholder="Message"
          className="rounded-2xl shadow px-6 py-3.5 w-full tracking-wide outline-none"
          {...register("content")}
        />
        <button className="bg-white p-3.5 shadow rounded-full text-secondary-400 hover:bg-secondary-400 hover:text-white">
          <SendHorizonal />
        </button>
      </div>
    </form>
  );
};
