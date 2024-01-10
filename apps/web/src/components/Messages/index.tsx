import { Avatar } from "..";

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

export const Messages = () => {
  return (
    <section className="h-full max-h-full overflow-y-auto mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 container flex flex-col gap-y-1.5">
      <Message content={"pogchamp kekw omegalul"} />
      <Message content={"pogchamp kekw omegalul"} />
      <Message content={"pogchamp kekw omegalul"} />
      <Message content={"pogchamp kekw omegalul"} />
      <Message content={"pogchamp kekw omegalul"} />
      <Message content={"pogchamp kekw omegalul"} />
      <Message content={"pogchamp kekw omegalul"} />
      <Message content={"pogchamp kekw omegalul"} />{" "}
      <Message content={"pogchamp kekw omegalul"} />
      <Message content={"pogchamp kekw omegalul"} />
      <Message content={"pogchamp kekw omegalul"} />
      <Message content={"pogchamp kekw omegalul"} />{" "}
      <Message content={"pogchamp kekw omegalul"} />
      <Message content={"pogchamp kekw omegalul"} />
      <Message content={"pogchamp kekw omegalul"} />
      <Message content={"pogchamp kekw omegalul"} />{" "}
      <Message content={"pogchamp kekw omegalul"} />
      <Message content={"pogchamp kekw omegalul"} />
      <Message content={"pogchamp kekw omegalul"} />
      <Message content={"pogchamp kekw omegalul"} />{" "}
      <Message content={"pogchamp kekw omegalul"} />
      <Message content={"pogchamp kekw omegalul"} />
      <Message content={"pogchamp kekw omegalul"} />
      <Message content={"pogchamp kekw omegalul"} />
    </section>
  );
};

export const MessageInput = () => {
  return <input></input>;
};
