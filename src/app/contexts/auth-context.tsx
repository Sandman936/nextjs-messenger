"use client";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
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
  const isRefreshing = useRef(false);

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
    if (isRefreshing.current) {
      return;
    }

    isRefreshing.current = true;
    setIsLoading(true);

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Session error:", sessionError);
        setUser(null);
        return;
      }

      if (session?.user) {
        if (user?.id === session.user.id) {
          setIsLoading(false);
          return;
        }
        await fetchUser(session.user.id);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Refresh error:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
      isRefreshing.current = false;
    }
  }, [fetchUser, user?.id]);

  const signOut = useCallback(async () => {
    setUser(null);
    clearCurrentChat();

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Ошибка выхода из профиля:", error);
        return;
      }
    } catch (error) {
      console.error("Ошибка выхода из профиля:", error);
    }
  }, [clearCurrentChat]);

  useEffect(() => {
    let isSubscribed = true;
    let isInitialized = false;

    const initializeAuth = async () => {
      if (isInitialized) return;
      isInitialized = true;

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user && isSubscribed) {
          await fetchUser(session.user.id);
        } else if (isSubscribed) {
          setUser(null);
        }
      } finally {
        if (isSubscribed) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!isSubscribed) return;

      if (session?.user) {
        await fetchUser(session.user.id);
      } else {
        setUser(null);
      }
    });

    return () => {
      isSubscribed = false;
      subscription.unsubscribe();
    };
  }, [fetchUser]);

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
