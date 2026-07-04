"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getChatMessages } from "../actions/chats";
import { supabase } from "../supabase/client";
import type { IMessage } from "../types";

export const useRealtimeChatMessages = (chatId: string) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isMessagesLoading, setIsMessagesLoading] = useState(true);
  const [loadingMessagesError, setLoadingMessagesError] = useState<string>("");

  const messagesChannelRef = useRef<ReturnType<typeof supabase.channel> | null>(
    null,
  );
  const isMounted = useRef(true);

  const loadMessages = useCallback(async () => {
    if (!chatId) return;

    try {
      setIsMessagesLoading(true);
      setLoadingMessagesError("");

      const loadedMessages = await getChatMessages(chatId);

      if (isMounted.current) {
        setMessages(loadedMessages);
        setLoadingMessagesError("");
      }
    } catch (err) {
      if (isMounted.current) {
        setLoadingMessagesError(
          err instanceof Error ? err.message : "Ошибка загрузки сообщений",
        );
      }
    } finally {
      if (isMounted.current) {
        setIsMessagesLoading(false);
      }
    }
  }, [chatId]);

  useEffect(() => {
    isMounted.current = true;

    if (!chatId) return;

    const newChannel = supabase
      .channel(`chat:${chatId}:changes`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `chat_id=eq.${chatId}`,
        },
        (payload) => {
          const newMessage = payload.new as IMessage;
          setMessages((current) => {
            if (current.some((msg) => msg.id === newMessage.id)) return current;
            return [...current, newMessage];
          });
        },
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          setIsConnected(true);
          setLoadingMessagesError("");
          loadMessages();
        } else if (status === "CHANNEL_ERROR") {
          setIsConnected(false);
          setLoadingMessagesError("Ошибка получения сообщений");
        } else if (status === "CLOSED") {
          setIsConnected(false);
          setLoadingMessagesError("Соединение прервано");
        }
      });

    messagesChannelRef.current = newChannel;

    return () => {
      isMounted.current = false;
      if (messagesChannelRef.current) {
        supabase.removeChannel(newChannel);
        messagesChannelRef.current = null;
      }
      setIsConnected(false);
    };
  }, [chatId, loadMessages]);

  return { messages, isConnected, loadingMessagesError, isMessagesLoading };
};
