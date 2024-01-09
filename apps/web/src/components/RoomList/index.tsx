import { Search } from "@/components/Search";

const Room = () => {
  return (
    <button className="flex items-center hover:bg-zinc-100/80 p-2 rounded-xl gap-2 text-left">
      <span className="w-12 h-12 rounded-full bg-secondary-500"></span>
      <div className="flex flex-col">
        <span className="font-medium">username</span>
        <p className="text-zinc-800">last room message preview</p>
      </div>
    </button>
  );
};

export const RoomList = () => {
  return (
    <section className="min-w-64 max-w-md lg:w-[33vw] xl:w-[25vw] bg-white shadow py-2 flex flex-col gap-2 h-screen">
      <div className="px-3">
        <Search />
      </div>
      <div className="h-full max-h-full flex flex-col overflow-y-auto px-3">
        <Room />
      </div>
    </section>
  );
};
