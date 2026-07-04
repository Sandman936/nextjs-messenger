"use client";

import { useState } from "react";
import { sendMessage } from "@/app/lib/actions/chats";
import { useChatScroll } from "@/app/lib/hooks/use-chat-scroll";
import ChatInput from "./chat-input/chat-input";
import ChatMessages from "./chat-messages/chat-messages";
import ChatHeader from "./header/chat-header";

interface IRealTimeChat {
  id: string;
}

export const RealtimeChat = ({ id }: IRealTimeChat) => {
  const { containerRef, scrollToBottom } = useChatScroll();
  const [chatInputValue, setChatInputValue] = useState<string>("");

  const handleSendMessage = async () => {
  const text = chatInputValue.trim();
  
  if (!text) return;

  setChatInputValue("");

  try {
    const result = await sendMessage({ text, chat_id: id });

    if (!result) {
      console.error("Не удалось отправить сообщение!");
      setChatInputValue(text);
    }
  } catch (error) {
    console.error(" Ошибка отправки:", error);
    setChatInputValue(text);
  }
};

  return (
    <section className="bg-white text-(--text-primary-color) flex flex-col grow justify-between h-full min-h-0">
      <ChatHeader />
      <ChatMessages ref={containerRef} chat_id={id} />
      <ChatInput
        value={chatInputValue}
        setValue={setChatInputValue}
        handleSendMessage={handleSendMessage}
      />
    </section>
  );
};
