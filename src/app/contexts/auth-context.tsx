"use client";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../lib/supabase/client";
import type { IUserInfo } from "../lib/types";
import { useCurrentChat } from "./current-chat-context";

interface IAuthContext {
  user: IUserInfo | null;
  setUser: Dispatch<SetStateAction<IUserInfo | null>>;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUserInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { clearCurrentChat } = useCurrentChat();

  const fetchUser = useCallback(async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error loading user:", error);
        setUser(null);
        return;
      }

      const userProfile: IUserInfo = {
        id: profile.id,
        first_name: profile.first_name,
        last_name: profile.last_name ?? "",
        avatar_url: profile.avatar_url,
      };

      setUser(userProfile);
    } catch (error) {
      console.error("Error loading user:", error);
      setUser(null);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    setIsLoading(true);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user) {
      await fetchUser(session.user.id);
    } else {
      setUser(null);
    }

    setIsLoading(false);
  }, [fetchUser]);

  const signOut = useCallback(async () => {
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Ошибка выхода из профиля:", error);
        throw error;
      }

      setUser(null);
      clearCurrentChat();
    } catch (error) {
      console.error("Ошибка выхода из профиля:", error);
    } finally {
      setIsLoading(false);
    }
  }, [clearCurrentChat]);

  useEffect(() => {
    refreshUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await fetchUser(session.user.id);
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [refreshUser, fetchUser]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, isLoading, refreshUser, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth должен находиться внутри AuthProvider");
  }

  return context;
};
