//Интерфейсы чата

export interface IMessage {
  id: string;
  sender_id: string;
  created_at: string;
  content: string;
  is_read: boolean;
}

export interface IMessageComponent {
  user: IUserInfo | null;
  text: string;
  isOwnMessage: boolean;
  showSender: boolean;
  id: string;
  createdAt: string;
}

export interface IChat {
  id: string;
  user_info: IUserInfo;
  last_message: ILastMessage | null;
  unread_count: number;
}

interface ILastMessage {
  id: number;
  content: string;
  created_at: string;
  sender_id: string;
}

export interface IUserInfo {
  id: string;
  first_name: string;
  last_name: string | null;
  avatar_url: string | null;
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
