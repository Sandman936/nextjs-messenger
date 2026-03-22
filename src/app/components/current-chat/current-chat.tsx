"use client";

import { useState } from "react";
import { RealtimeChat } from "./realtime-chat";

const CurrentChat = () => {
  const [userNameInputValue, setUserNameInputValue] = useState<string>("");

  return (
    <RealtimeChat
      roomName="chat-room"
      username={userNameInputValue}
      setUsername={setUserNameInputValue}
    />
  );
};

export default CurrentChat;
