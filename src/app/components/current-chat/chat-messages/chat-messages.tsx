"use client";

import React from "react";
import { useAuth } from "@/app/contexts/auth-context";
import { useCurrentChat } from "@/app/contexts/current-chat-context";
import { useRealtimeChatMessages } from "@/app/lib/hooks/use-realtime-chat-messages";
import MessagesList from "./chat-messages-list";
import EmptyStateMessages from "./empty-messages";
import ErrorStateMessages from "./error-messages";
import LoadingStateMessages from "./loading-messages";

interface IChatMessagesProps {
  chat_id: string;
}

const ChatMessages = React.forwardRef<HTMLDivElement, IChatMessagesProps>(
  ({ chat_id }, ref) => {
    const { user: currentUser } = useAuth();
    const { currentChatUserInfo } = useCurrentChat();
    const {
      messages,
      isMessagesLoading: isLoading,
      loadingMessagesError: error,
    } = useRealtimeChatMessages(chat_id);

    if (isLoading) {
      return (
        <div className="flex flex-col h-full w-full bg-background min-h-0 flex-1">
          <div ref={ref} className="overflow-y-auto p-4 space-y-4 scrollbar">
            <LoadingStateMessages />
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col h-full w-full bg-background min-h-0 flex-1">
          <div ref={ref} className="overflow-y-auto p-4 space-y-4 scrollbar">
            <ErrorStateMessages />
          </div>
        </div>
      );
    }

    if (messages.length === 0) {
      return (
        <div className="flex flex-col h-full w-full bg-background min-h-0 flex-1">
          <div ref={ref} className="overflow-y-auto p-4 space-y-4 scrollbar">
            <EmptyStateMessages />
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full w-full bg-background min-h-0 flex-1">
        <div ref={ref} className="overflow-y-auto p-4 space-y-4 scrollbar">
          <MessagesList
            messages={messages}
            currentUser={currentUser}
            chosenUser={currentChatUserInfo}
          />
        </div>
      </div>
    );
  },
);

export default ChatMessages;
