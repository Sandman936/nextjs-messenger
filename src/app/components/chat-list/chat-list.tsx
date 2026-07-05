import { MessageCircleOff } from "lucide-react";
import type { IChat } from "@/app/lib/types";
import ChatCard from "./chat-card/chat-card";

interface IChatListProps {
  chatsArray: IChat[];
}

const ChatList = ({ chatsArray }: IChatListProps) => {
  const visibleChats = chatsArray.filter(chat => chat.last_message !== null);

  return (
    <ul className="h-full">
      {visibleChats.length ? (
        visibleChats.map((chat) => <ChatCard key={chat.id} card_data={chat} />)
      ) : (
        <div className="flex flex-col items-center gap-5 px-5">
          <MessageCircleOff size={96} color="var(--accent-color)" />
          <h2 className="text-xl text-center font-semibold">
            Список чатов пока пуст
          </h2>
        </div>
      )}
    </ul>
  );
};

export default ChatList;
