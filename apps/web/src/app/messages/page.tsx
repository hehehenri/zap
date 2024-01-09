import { RoomList } from "@/components";

const ChatEmptyState = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div>
        <h1 className="font-mono text-5xl font-semibold text-secondary-400">
          Select a message
        </h1>
        <p className="text-lg text-secondary-950/60">
          Choose from your existing conversations, start a new one, or just keep
          swimming.
        </p>
      </div>
    </div>
  );
};

const Messages = () => {
  return (
    <main className="grid grid-cols-[auto_1fr] h-full">
      <RoomList />
      <ChatEmptyState />
    </main>
  );
};

export default Messages;
