"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/app/contexts/auth-context";
import { getChatMessages } from "../actions/chats";
import { createClient } from "../supabase/client";
import type { IMessage } from "../types";

export const useRealtimeChat = (chatId: string) => {
  const supabase = createClient();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const [isMessagesLoading, setIsMessagesLoading] = useState(true);
  const [loadingMessagesError, setLoadingMessagesError] = useState<string>("");

  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const { user: currentUser } = useAuth();

  const loadMessages = useCallback(async () => {
    if (!chatId) return;

    try {
      setIsMessagesLoading(true);
      setLoadingMessagesError("");

      const loadedMessages = await getChatMessages(chatId);

      setMessages(loadedMessages);
    } catch (err) {
      setLoadingMessagesError("Не удалось загрузить сообщения");
      console.error(err);
    } finally {
      setIsMessagesLoading(false);
    }
  }, [chatId]);

  useEffect(() => {
    if (!chatId || !currentUser) return;

    console.log(`🔗 Подключаемся к чату: ${chatId}`);

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
          console.log("📨 Новое сообщение (postgres_changes):", payload);

          const newMessage = payload.new as IMessage;
          setMessages((current) => {
            const exists = current.some((msg) => msg.id === newMessage.id);
            if (exists) return current;
            return [...current, newMessage];
          });
        },
      )
      .subscribe((status) => {
        console.log(`📡 Статус канала chat:${chatId}:changes:`, status);

        if (status === "SUBSCRIBED") {
          console.log("✅ Подписка активна");
          setIsConnected(true);
          setLoadingMessagesError("");
          loadMessages();
        } else if (status === "CHANNEL_ERROR") {
          console.error("❌ Ошибка канала");
          setIsConnected(false);
          setLoadingMessagesError("Ошибка подключения к чату");
        } else {
          console.log(`📡 Другой статус: ${status}`);
          setIsConnected(false);
        }
      });

    channelRef.current = newChannel;

    return () => {
      console.log(`🔌 Отключаемся от чата: ${chatId}`);
      if (channelRef.current) {
        supabase.removeChannel(newChannel);
        channelRef.current = null;
      }
      setIsConnected(false);
    };
  }, [chatId, currentUser, loadMessages, supabase]);

  return { messages, isConnected, loadingMessagesError, isMessagesLoading };
};
