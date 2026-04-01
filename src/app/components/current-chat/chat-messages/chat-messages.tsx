"use client";

import React from "react";
import { useAuth } from "@/app/contexts/auth-context";
import type { IMessage } from "@/app/lib/types";
import { showUsername } from "@/app/lib/utils";
import Message from "./message";

interface IProps {
  messages: IMessage[];
}

const ChatMessages = React.forwardRef<HTMLDivElement, IProps>(
  ({ messages }, ref) => {
    const { user: currentUser } = useAuth();

    return (
      <div className="flex flex-col h-full w-full bg-background min-h-0 flex-1">
        <div ref={ref} className="overflow-y-auto p-4 space-y-4 scrollbar">
          <div className="space-y-1">
            {messages.length === 0 ? (
              <div className="text-center text-(--text-secondary-color)">
                Сообщений пока нет. Начните общение сейчас!
              </div>
            ) : null}
            {messages.map((message: IMessage, index) => {
              const prevMessage = index > 0 ? messages[index - 1] : null;

              return (
                <div
                  data-message-id={message.id}
                  key={message.id}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-300"
                >
                  <Message
                    user={message.user}
                    text={message.text}
                    isOwnMessage={message.user.id === currentUser?.id}
                    showSender={showUsername(message, prevMessage)}
                    id={message.id}
                    createdAt={message.createdAt}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  },
);

export default ChatMessages;
