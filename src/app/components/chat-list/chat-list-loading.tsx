import { useLayoutEffect, useRef, useState } from "react";
import ChatCardSkeleton from "./chat-card/chat-card-skeleton";

interface IChatListLoadingProps {
  cardHeight?: number;
}

const ChatListLoading = ({ cardHeight = 90 }: IChatListLoadingProps) => {
  const listRef = useRef<HTMLUListElement>(null);
  const [numberOfCards, setNumberOfCards] = useState<number>(8);

  useLayoutEffect(() => {
    if (listRef.current) {
      setNumberOfCards(Math.floor(listRef.current.clientHeight / cardHeight));
    }
  }, [cardHeight]);

  return (
    <ul ref={listRef} className="h-full overflow-hidden">
      {Array.from({ length: numberOfCards }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: Никаких операций с карточками не требуется
        <ChatCardSkeleton key={index} />
      ))}
    </ul>
  );
};

export default ChatListLoading;
