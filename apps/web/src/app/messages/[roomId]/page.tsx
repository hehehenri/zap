import { RoomList, Messages } from "@/components";

const RoomMessages = () => {
  return (
    <main className="grid grid-cols-[auto_1fr] h-full">
      <RoomList />
      <Messages />
    </main>
  );
};

export default RoomMessages;
