"use client";

import { useCurrentChat } from "@/app/contexts/current-chat-context";

import { RealtimeChat } from "./realtime-chat";

const CurrentChat = () => {
  const { currentChatId } = useCurrentChat();

  return currentChatId ? (
    <RealtimeChat id={currentChatId} />
  ) : (
    <section className="bg-white text-(--text-primary-color) flex flex-col h-full min-h-0 justify-center">
      <h3 className="text-center text-xl">Выберите чат для начала общения</h3>
    </section>
  );
};

export default CurrentChat;
