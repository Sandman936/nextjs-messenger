"use client";

import { MessageCircleX } from "lucide-react";
import { useEffect, useState } from "react";
import ChatList from "../components/chat-list/chat-list";
import SearchBar from "../components/ui/search-bar/search-bar";
import { getChatsList } from "../lib/actions/chats";
import type { IChat } from "../lib/types";

export default function ChatsPage() {
  const [chats, setChats] = useState<IChat[]>([]);
  const [isChatsLoading, setIsChatsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchChats = async () => {
    try {
      setIsChatsLoading(true);
      const chats = await getChatsList();

      setChats(chats ?? []);
    } catch (error) {
      console.error("Ошибка получения чатов", error);
      setError("Не удалось получить список чатов");
    } finally {
      setIsChatsLoading(false);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: Первичная загрузка чатов
  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className="bg-(--primary-purple) border-r-2 border-(--light-purple) flex flex-col gap-6 h-full relative">
      <SearchBar placeholder="Поиск чатов" addButton />
      {error ? (
        <div className="flex flex-col items-center gap-5 px-5">
          <MessageCircleX size={96} color="var(--accent-color)" />
          <h2 className="text-xl text-center font-semibold">{error}</h2>
        </div>
      ) : (
        <ChatList chatsArray={chats} isLoading={isChatsLoading} />
      )}
    </div>
  );
}