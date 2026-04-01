//Интерфейсы чата

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
  id: string;
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
  first_name: string;
  last_name: string | null;
  avatar_url: string | null;
  hasSetName: boolean;
  created_at: string;
  updated_at: string | undefined;
}

//Интерфейс комнаты

export interface IRealtimeChatProps {
  roomName: string;
  onMessage?: (messages: IMessage[]) => void;
  messages?: IMessage[];
}

export interface IUseRealtimeChatProps {
  roomName: string;
}

//Интерфейс аутентификации

export interface IAuthFormData {
  firstName: string;
  lastName?: string;
}
