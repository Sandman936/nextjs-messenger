"use client";

import { MessageCircleX } from "lucide-react";
import ChatList from "../components/chat-list/chat-list";
import ChatListLoading from "../components/chat-list/chat-list-loading";
import SearchBar from "../components/ui/search-bar/search-bar";
import { useAuth } from "../contexts/auth-context";
import { useRealtimeChats } from "../lib/hooks/use-realtime-chats";

export default function ChatsPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { chats, isChatsLoading, loadingChatsError } = useRealtimeChats(
    user?.id || "",
  );

  if (isAuthLoading || isChatsLoading) {
    return (
      <div className="bg-(--primary-purple) border-r-2 border-(--light-purple) flex flex-col gap-6 h-full relative">
        <ChatListLoading />
      </div>
    );
  }

  if (loadingChatsError) {
    return (
      <div className="bg-(--primary-purple) border-r-2 border-(--light-purple) flex flex-col gap-6 h-full relative">
        <div className="flex flex-col items-center gap-5 px-5 py-10">
          <MessageCircleX size={96} color="var(--accent-color)" />
          <h2 className="text-xl text-center font-semibold">
            Не удалось загрузить чаты
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-(--primary-purple) border-r-2 border-(--light-purple) flex flex-col gap-6 h-full relative">
      <SearchBar placeholder="Поиск чатов" addButton />
      <ChatList chatsArray={chats} />
    </div>
  );
}
