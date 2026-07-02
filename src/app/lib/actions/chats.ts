"use server";

import { createClient } from "../supabase/server";
import type { IChat, IMessage } from "../types";

//Получаем список чатов

export const getChatsList = async (): Promise<IChat[]> => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.rpc("get_user_chats");

    if (error) {
      console.error("Error fetching chats:", error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Unexpected error in get_user_chats:", error);
    throw error;
  }
};

//Находим или создаем новый чат

export const findOrCreateChat = async (
  otherUserId: string,
): Promise<string> => {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_or_create_chat", {
    other_user_id: otherUserId,
  });

  if (error) {
    console.error("Ошибка при поиске/создании чата:", error);
    throw new Error("Не удалось найти или создать чат");
  }

  return data;
};

export async function getChatById(chatId: string): Promise<IChat> {
  const supabase = await createClient();

  const { data: chat, error: chatError } = await supabase
    .from("chats")
    .select("*")
    .eq("id", chatId)
    .single();

  if (chatError) throw new Error("Чат не найден");

  return chat;
}

export const getChatMessages = async (chat_id: string): Promise<IMessage[]> => {
  const supabase = await createClient();

  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chat_id)
    .order("created_at", { ascending: true })
    .limit(100);

  if (error) {
    console.error("Ошибка при загрузке сообщений:", error);
    return [];
  }

  return messages;
};

export const sendMessage = async ({
  text,
  chat_id,
}: {
  text: string;
  chat_id: string;
}) => {
  if (!chat_id) {
    console.error("Не удалось определить текущий чат");
    return;
  }

  if (!text.trim()) {
    console.error("Сообщение не может быть пустым");
    return;
  }

  if (text.length > 5000) {
    console.error("Сообщение слишком длинное");
    return;
  }

  const supabase = await createClient();

  const { data: messageId, error } = await supabase.rpc("send_message", {
    p_chat_id: chat_id,
    p_text: text.trim(),
  });

  if (error) {
    console.error(`Ошибка отправки сообщения:${error.message}`);
    return;
  }

  return messageId;
};
