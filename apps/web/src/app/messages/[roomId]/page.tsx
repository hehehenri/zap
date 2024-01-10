import { RoomList, Messages, MessagesHeader, MessageInput } from "@/components";

const RoomMessages = () => {
  return (
    <main className="grid grid-cols-[auto_1fr] h-full">
      <RoomList />
      <div className="flex flex-col h-screen">
        <div className="flex flex-col h-screen">
          <MessagesHeader />
          <Messages />
        </div>
      </div>
    </main>
  );
};

export default RoomMessages;
