"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { createClient } from "../lib/supabase/client";
import type { IUserProfile } from "../lib/types";

interface IAuthContext {
  user: IUserProfile | null;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const supabase = createClient();

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        setUser(null);
        return;
      }

      const userProfile: IUserProfile = {
        id: user.id,
        first_name: user.user_metadata?.first_name,
        last_name: user.user_metadata?.last_name,
        avatar_url: user.user_metadata?.avatar_url,
        hasSetName: user.user_metadata?.has_set_name || false,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };

      setUser(userProfile);
    } catch (error) {
      console.error("Ошибка загрузки пользователя:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    await fetchUser();
  };

  useEffect(() => {
    fetchUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        await fetchUser();
      } else if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  //TODO: Сделать сброс профиля при выходе из профиля;

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, refreshUser, signOut }}>
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
