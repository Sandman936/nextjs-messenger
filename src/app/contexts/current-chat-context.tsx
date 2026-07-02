"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { findOrCreateChat } from "../lib/actions/chats";
import type { IUserInfo } from "../lib/types";

interface IChatContext {
  currentChatId: string | null;
  currentChatUserInfo: IUserInfo | null;
  isLoading: boolean;
  error: string | null;
  openChat: (chosenUser: IUserInfo, id?: string) => Promise<void>;
  clearCurrentChat: () => void;
}

const CurrentChatContext = createContext<IChatContext | undefined>(undefined);

export const CurrentChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [currentChatUserInfo, setCurrentChatUserInfo] =
    useState<IUserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openChat = useCallback(async (chosenUser: IUserInfo, id?: string) => {
    if (currentChatUserInfo?.id === chosenUser.id) {
      return;
    }

    if (id) {
      setCurrentChatId(id);
      setCurrentChatUserInfo(chosenUser);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const chatId = await findOrCreateChat(chosenUser.id);
      setCurrentChatId(chatId);
      setCurrentChatUserInfo(chosenUser);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Не удалось открыть чат";
      setError(errorMessage);
      console.error("❌ Ошибка:", err);
    } finally {
      setIsLoading(false);
    }
  }, [currentChatUserInfo?.id]);

  const clearCurrentChat = useCallback(() => {
    setCurrentChatId(null);
    setCurrentChatUserInfo(null);
  }, []);

  const value = {
    currentChatId,
    currentChatUserInfo,
    isLoading,
    error,
    openChat,
    clearCurrentChat,
  };

  return (
    <CurrentChatContext.Provider value={value}>
      {children}
    </CurrentChatContext.Provider>
  );
};

export const useCurentChat = () => {
  const context = useContext(CurrentChatContext);
  if (!context) {
    throw new Error("useChat must be used within ChatProvider");
  }
  return context;
};
