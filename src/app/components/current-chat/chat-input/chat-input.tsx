import { Paperclip, SendHorizontal, Smile } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { cn } from "@/app/lib/utils";

interface IProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  handleSendMessage: () => void;
}

const ChatInput = ({ value, setValue, handleSendMessage }: IProps) => {
  const isSendButtonActive = value.trim();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isSendButtonActive) {
      e.preventDefault();
      console.log("Enter был нажат!");
      handleSendMessage();
    }

    return;
  };

  return (
    <div className="bg-background flex justify-between px-6 py-3 items-center border-t-2 border-(--border-light) gap-3">
      <div className="flex w-full gap-3">
        <button type="button">
          <Paperclip size={30} />
        </button>
        <input
          autoComplete="off"
          type="text"
          id="chat-input"
          value={value}
          onKeyDown={(e) => handleKeyPress(e)}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Напишите ваше сообщение здесь"
          className="bg-white text-(--text-primary-color) placeholder:text-(--text-secondary-color) rounded-md px-2 py-1 focus:outline-2 focus:outline-(--accent-color) w-full"
        />
      </div>
      <div className="flex gap-3">
        <button type="button">
          <Smile size={30} />
        </button>
        <button
          type="button"
          disabled={!isSendButtonActive}
          onClick={() => handleSendMessage()}
          className={cn("cursor-pointer hover:text-(--accent-color)", {
            "text-(--text-purple-color) pointer-events-none":
              !isSendButtonActive,
          })}
        >
          <SendHorizontal size={30} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
