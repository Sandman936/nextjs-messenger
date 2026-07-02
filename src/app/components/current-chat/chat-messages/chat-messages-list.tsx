import React from "react";
import type { IMessage, IUserInfo } from "@/app/lib/types";
import { showName } from "@/app/lib/utils";
import Message from "./message";

interface IMessagesListProps {
  messages: IMessage[];
  currentUser: IUserInfo | null;
  chosenUser: IUserInfo | null;
}

const MessagesList = React.memo(
  ({ messages, currentUser, chosenUser }: IMessagesListProps) => {
    return (
      <div className="space-y-1">
        {messages.map((message: IMessage, index) => {
          const prevMessage = index > 0 ? messages[index - 1] : null;

          return (
            <div
              data-message-id={message.id}
              key={message.id}
              className="animate-in fade-in slide-in-from-bottom-4 duration-300"
            >
              <Message
                user={
                  message.sender_id === currentUser?.id
                    ? currentUser
                    : chosenUser
                }
                text={message.content}
                isOwnMessage={message.sender_id === currentUser?.id}
                showSender={showName(message.sender_id, prevMessage?.sender_id)}
                id={message.id}
                createdAt={message.created_at}
              />
            </div>
          );
        })}
      </div>
    );
  },
);

export default MessagesList;
