"use client";

import React from "react";
import type { IMessage } from "@/app/lib/types";
import Message from "./message";

interface IProps {
  messages: IMessage[];
  username: string;
}

const ChatMessages = React.forwardRef<HTMLDivElement, IProps>(
  ({messages, username}, ref) => (
    <div className="flex flex-col h-full w-full bg-background">
      <div ref={ref} className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="space-y-1">
          {messages.map((message: IMessage, index) => {
            const prevMessage = index > 0 ? messages[index - 1] : null;
            const showUsername = !prevMessage || prevMessage.user.first_name !== message.user.first_name;

            return (
              <div
                data-message-id={message.id}
                key={message.id}
                className="animate-in fade-in slide-in-from-bottom-4 duration-300"
              >
                <Message
                  user={message.user}
                  text={message.text}
                  isOwnMessage={message.user.first_name === username}
                  showSender={showUsername}
                  id={message.id}
                  createdAt={message.createdAt}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ),
);

export default ChatMessages;
