"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useChatScroll } from "@/app/lib/hooks/use-chat-scroll";
import { useRealtimeChat } from "@/app/lib/hooks/use-realtime-chat";
import type { IRealtimeChatProps } from "@/app/lib/types";
import ChatInput from "./chat-input/chat-input";
import ChatMessages from "./chat-messages/chat-messages";
import ChatHeader from "./header/chat-header";

/**
 * Realtime chat component
 * @param roomName - The name of the room to join. Each room is a unique chat.
 * @param username - The username of the user
 * @param onMessage - The callback function to handle the messages. Useful if you want to store the messages in a database.
 * @param messages - The messages to display in the chat. Useful if you want to display messages from a database.
 * @returns The chat component
 */

export const RealtimeChat = ({
  roomName,
  username,
  setUsername,
  onMessage,
  messages: initialMessages = [],
}: IRealtimeChatProps) => {
  const { containerRef, scrollToBottom } = useChatScroll();

  const {
    messages: realtimeMessages,
    sendMessage,
    isConnected,
  } = useRealtimeChat({
    roomName,
    username,
  });

  const [chatInputValue, setChatInputValue] = useState<string>("");

  // Merge realtime messages with initial messages
  const allMessages = useMemo(() => {
    const mergedMessages = [...initialMessages, ...realtimeMessages];
    // Remove duplicates based on message id
    const uniqueMessages = mergedMessages.filter(
      (message, index, self) =>
        index === self.findIndex((m) => m.id === message.id),
    );
    // Sort by creation date
    const sortedMessages = uniqueMessages.sort((a, b) =>
      a.createdAt.localeCompare(b.createdAt),
    );

    return sortedMessages;
  }, [initialMessages, realtimeMessages]);

  useEffect(() => {
    if (onMessage) {
      onMessage(allMessages);
    }
  }, [allMessages, onMessage]);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    scrollToBottom();
  }, [allMessages, scrollToBottom]);

  const handleSendMessage = useCallback(() => {
    if (!chatInputValue.trim() || !isConnected) return;

    sendMessage(chatInputValue);
    setChatInputValue("");
  }, [chatInputValue, isConnected, sendMessage]);

  return (
    <section className="bg-white text-(--text-primary-color) flex flex-col grow justify-between h-full">
      <ChatHeader username={username} setUsername={setUsername} />
      <ChatMessages
        ref={containerRef}
        messages={allMessages}
        username={username}
      />
      <ChatInput
        value={chatInputValue}
        setValue={setChatInputValue}
        handleSendMessage={handleSendMessage}
      />
    </section>
  );
};
