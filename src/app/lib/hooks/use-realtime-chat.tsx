"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "../supabase/client";

import type { IMessage, IUseRealtimeChatProps } from "../types";

const EVENT_MESSAGE_TYPE = "message";

export function useRealtimeChat({ roomName, username }: IUseRealtimeChatProps) {
  const supabase = createClient();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [channel, setChannel] = useState<ReturnType<
    typeof supabase.channel
  > | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newChannel = supabase.channel(roomName);

    newChannel
      .on("broadcast", { event: EVENT_MESSAGE_TYPE }, (payload) => {
        setMessages((current) => [...current, payload.payload as IMessage]);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      });

    setChannel(newChannel);

    return () => {
      supabase.removeChannel(newChannel);
    };
  }, [roomName, supabase]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!channel || !isConnected) return;

      const message: IMessage = {
        user: {
          first_name: username,
          last_name: "",
          avatar_url: null,
        },
        text,
        isOwnMessage: true,
        showSender: true,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };

      // Update local state immediately for the sender
      setMessages((current) => [...current, message]);

      await channel.send({
        type: "broadcast",
        event: EVENT_MESSAGE_TYPE,
        payload: message,
      });
    },
    [channel, isConnected, username],
  );

  return { messages, sendMessage, isConnected };
}
