import { cn } from "@/utils";
import { MessagesList } from "./MessagesList";
import { User } from "@/auth";

// TODO
// Could not generate the message type because I couldn't map an
// array of fragments into an array of data due to rule-of-hooks.
type Message = {
  id: string;
  content: string;
  sender: {
    id: string;
    username: string;
  };
  sentAt: string;
};

const getSentAt = (message: Message) => {
  const date = new Date(message.sentAt);

  return new Intl.DateTimeFormat("pt-BR", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
};

const getLastMessage = (messages: Message[]) => {
  const lastMessages = messages.slice(-1);
  if (lastMessages.length == 1) {
    return lastMessages[0];
  }

  return null;
};

export const MessageGroup = ({
  messages,
  user,
}: {
  messages: Message[];
  user: User;
}) => {
  const groups = [];

  let currentGroup: Message[] = [];

  for (const message of messages) {
    const lastMessage = currentGroup[currentGroup.length - 1];

    // Split into a new group so each message sender has it own group
    if (lastMessage?.sender.id !== message.sender.id) {
      groups.push(currentGroup);
      currentGroup = [message];
      continue;
    }

    // Split into a new group if the time difference from the last messsage
    // exceeds 5 minutes
    const MAX_TIME_DIFF = 5 * 60000;
    const lastMessageTime = new Date(lastMessage.sentAt).getTime();
    const currentMessageTime = new Date(message.sentAt).getTime();
    if (currentMessageTime - lastMessageTime > MAX_TIME_DIFF) {
      groups.push(currentGroup);
      currentGroup = [message];
      continue;
    }

    currentGroup.push(message);
  }

  // Push the last group into the groups array
  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }

  return (
    <>
      {groups.map((messageGroup, id) => {
        const isSender = messageGroup[0]?.sender.id == user.id;
        const isLastGroup = id + 1 === groups.length;
        const lastMessage = getLastMessage(messageGroup);

        return (
          <div key={id}>
            <MessagesList
              isSender={isSender}
              messages={messageGroup.map((message) => message.content)}
            />
            <div
              className={cn("flex gap-1.5 text-zinc-400", {
                "justify-end": isSender,
              })}
            >
              {isSender && isLastGroup && (
                <span className="text-sm mt-1">Sent</span>
              )}
              {lastMessage?.sentAt && (
                <span className="text-sm mt-1">{getSentAt(lastMessage)}</span>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};
