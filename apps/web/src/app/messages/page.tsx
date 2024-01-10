import { RoomList } from "@/components";

const ChatEmptyState = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="space-y-5">
        <div className="max-w-md">
          <h1 className="font-mono text-5xl font-semibold text-secondary-400">
            Select a message
          </h1>
          <p className="text-lg text-secondary-950/60">
            Choose from your existing conversations, start a new one, or just
            keep swimming.
          </p>
        </div>

        <button className="bg-secondary-400 rounded-full px-8 py-3 text-xl font-bold text-white font-mono">
          New Message
        </button>
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
