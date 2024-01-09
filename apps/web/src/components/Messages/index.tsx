const Message = ({ content }: { content: string }) => {
  return (
    <div className="bg-white rounded-lg shadow px-2 py-1.5 font-medium flex items-end gap-1 w-fit">
      <p className="p-0.5">{content}</p>
      <span className="text-xs text-gray-400">17:44</span>
    </div>
  );
};

export const Messages = () => {
  return (
    <section>
      <Message content={"pogchamp kekw omegalul"} />
    </section>
  );
};
