//Интерфейсы чата

import type { Dispatch, SetStateAction } from "react";

export interface IMessage {
  user: IUserInfo;
  text: string;
  isOwnMessage: boolean;
  showSender: boolean;
  id: string;
  createdAt: string;
}

export interface IChat {
  id: string;
  user_info: IUserProfile;
  last_message: ILastMessage | null;
  new_messages: number;
}

interface ILastMessage {
  id: number;
  content: string;
  created_at: string;
  sender_id: string;
}

interface IUserInfo {
  first_name: string;
  last_name: string | null;
  avatar_url: string | null;
}

//Интерфейсы контактов

export interface IContact {
  uid: string;
  first_name: string;
  last_name: string | null;
  avatar: string | null;
}

//Интерфейсы профиля

export interface IUserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string | null;
  avatar_url: string | null;
  username: string;
  bio: string;
  created_at: Date;
  updated_at: Date;
}

//Интерфейс комнаты

export interface IRealtimeChatProps {
  roomName: string;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  onMessage?: (messages: IMessage[]) => void;
  messages?: IMessage[];
}

export interface IUseRealtimeChatProps {
  roomName: string;
  username: string;
}

//Интерфейс аутентификации

export interface IAuthFormData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}
