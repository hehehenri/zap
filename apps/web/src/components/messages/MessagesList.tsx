import { cn } from "@/utils";

export const MessagesList = ({
  messages,
  isSender,
}: {
  messages: string[];
  isSender: boolean;
}) => {
  return (
    <div
      className={cn("w-full flex", isSender ? "justify-end" : "justify-start")}
    >
      <div className="flex flex-col gap-1 w-2/3">
        {messages.map((message, id) => {
          const isLastMessage = id + 1 === messages.length;
          const isFirstMessage = id == 0;

          return (
            <div
              key={id}
              className={cn("flex flex-col break-words", {
                "items-end rounded-l-full": isSender,
                "items-start rounded-r-full": !isSender,
              })}
            >
              <div className="relative mx-[7px]">
                <p
                  className={cn(
                    "px-3 py-1.5 bg-zinc-700 break-words max-w-[30rem] rounded-tl-3xl rounded-tr-3xl shadow text-stone-800",
                    {
                      "bg-white": !isSender,
                      "bg-secondary-300": isSender,
                      "rounded-l-[18px] rounded-tr-[18px] rounded-br-xl":
                        isFirstMessage && !isLastMessage && isSender,
                      "rounded-r-[18px] rounded-tl-[18px] rounded-bl-xl":
                        isFirstMessage && !isSender,
                      "rounded-bl-[18px] rounded-tr-xl rounded-br-0":
                        isLastMessage && isSender,
                      "rounded-br-[18px] rounded-tl-xl rounded-bl-0":
                        isLastMessage && !isSender,
                      "rounded-l-[18px] rounded-r-xl":
                        !isLastMessage && !isFirstMessage && isSender,
                      "rounded-r-[18px] rounded-l-xl":
                        !isLastMessage && !isFirstMessage && !isSender,
                    },
                  )}
                >
                  {message}
                </p>
                {isLastMessage && (
                  <svg
                    height={17}
                    width={7}
                    className={cn("absolute bottom-0", {
                      "fill-secondary-300 left-full": isSender,
                      "fill-white right-full -scale-x-100": !isSender,
                    })}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 7 17"
                  >
                    <path
                      d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z"
                      fill="inherit"
                    />
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
