"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getChatById, getChatsList } from "../actions/chats";
import { supabase } from "../supabase/client";
import type { IChat } from "../types";

export const useRealtimeChats = (userId: string) => {
  const [chats, setChats] = useState<IChat[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isChatsLoading, setIsChatsLoading] = useState(true);
  const [loadingChatsError, setLoadingChatsError] = useState<string>("");

  const chatsChannelRef = useRef<ReturnType<typeof supabase.channel> | null>(
    null,
  );
  const isMounted = useRef(true);

  const loadChats = useCallback(async () => {
    if (!userId) return;

    try {
      setIsChatsLoading(true);
      setLoadingChatsError("");

      const loadedChats = await getChatsList();

      if (isMounted.current) {
        setChats(loadedChats);
        setLoadingChatsError("");
      }
    } catch (err) {
      if (isMounted.current) {
        setLoadingChatsError(
          err instanceof Error ? err.message : "Ошибка загрузки сообщений",
        );
      }
    } finally {
      if (isMounted.current) {
        setIsChatsLoading(false);
      }
    }
  }, [userId]);

  const sortChats = useCallback((chatsToSort: IChat[]): IChat[] => {
    return [...chatsToSort].sort((a, b) => {
      if (a.last_message && !b.last_message) return -1;
      if (!a.last_message && b.last_message) return 1;

      if (a.last_message && b.last_message) {
        return (
          new Date(b.last_message.created_at).getTime() -
          new Date(a.last_message.created_at).getTime()
        );
      }

      return 0;
    });
  }, []);

  const addNewChat = useCallback(
    async (chatId: string) => {
      const newChat = await getChatById(chatId);

      if (newChat) {
        setChats((prevList) => {
          const exists = prevList.some((chat) => chat.id === chatId);
          if (exists) return prevList;
          return sortChats([newChat, ...prevList]);
        });
      }
    },
    [sortChats],
  );

  const updateChat = useCallback(
    (updatedChat: Partial<IChat>) => {
      setChats((prevChats) => {
        const index = prevChats.findIndex((chat) => chat.id === updatedChat.id);
        if (index === -1) return prevChats;

        const newChats = [...prevChats];
        const existingChat = newChats[index];

        const isOwnMessage = updatedChat.last_message?.sender_id === userId;

        newChats[index] = {
          ...existingChat,
          last_message: updatedChat.last_message ?? existingChat.last_message,
          unread_count: isOwnMessage
            ? existingChat.unread_count
            : existingChat.unread_count + 1,
        };

        return sortChats(newChats);
      });
    },
    [sortChats, userId],
  );

  useEffect(() => {
    isMounted.current = true;

    if (!userId) return;

    const newChannel = supabase
      .channel(`user-chats:${userId}:changes`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chats",
          filter: `user1_id=eq.${userId}`,
        },
        (payload) => {
          addNewChat(payload.new.id);
        },
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chats",
          filter: `user2_id=eq.${userId}`,
        },
        (payload) => {
          addNewChat(payload.new.id);
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "chats",
          filter: `user1_id=eq.${userId}`,
        },
        (payload) => {
          updateChat(payload.new);
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "chats",
          filter: `user2_id=eq.${userId}`,
        },
        (payload) => {
          updateChat(payload.new);
        },
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          setIsConnected(true);
          setLoadingChatsError("");
          loadChats();
        } else if (status === "CHANNEL_ERROR") {
          setIsConnected(false);
          setLoadingChatsError("Ошибка получения чатов");
        } else if (status === "CLOSED") {
          setIsConnected(false);
          setLoadingChatsError("Соединение прервано");
        }
      });

    chatsChannelRef.current = newChannel;

    return () => {
      isMounted.current = false;
      if (chatsChannelRef.current) {
        supabase.removeChannel(newChannel);
        chatsChannelRef.current = null;
      }
      setIsConnected(false);
    };
  }, [userId, loadChats, addNewChat, updateChat]);

  return { chats, isConnected, loadingChatsError, isChatsLoading };
};
