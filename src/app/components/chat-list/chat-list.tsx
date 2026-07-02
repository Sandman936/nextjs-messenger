import { MessageCircleOff } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import type { IChat } from "@/app/lib/types";
import { cn } from "@/app/lib/utils";
import ChatCard from "./chat-card/chat-card";
import ChatCardSkeleton from "./chat-card/chat-card-skeleton";

interface IProps {
  chatsArray: IChat[];
  isLoading: boolean;
  cardHeight?: number;
}

const ChatList = ({ chatsArray, isLoading, cardHeight = 90 }: IProps) => {
  const listRef = useRef<HTMLUListElement>(null);
  const [numberOfCards, setNumberOfCards] = useState<number>(8);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Дополнительные зависимости не требуются
  useLayoutEffect(() => {
    if (listRef.current) {
      setNumberOfCards(Math.floor(listRef.current.clientHeight / cardHeight));
    }
  }, [cardHeight, listRef]);

  return (
    <ul
      ref={listRef}
      className={cn("h-full", { "overflow-hidden": isLoading })}
    >
      {isLoading ? (
        Array.from({ length: numberOfCards }).map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: Никаких операций с карточками не требуется
          <ChatCardSkeleton key={index} />
        ))
      ) : chatsArray.length ? (
        chatsArray.map((chat) => <ChatCard key={chat.id} card_data={chat} />)
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
