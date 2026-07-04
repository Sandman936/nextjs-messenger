import Image from "next/image";
import { useCurrentChat } from "@/app/contexts/current-chat-context";
import type { IChat } from "@/app/lib/types";
import { cn } from "@/app/lib/utils";

interface IProps {
  card_data: IChat;
}

const ChatCard = ({ card_data }: IProps) => {
  const { openChat, currentChatId } = useCurrentChat();

  const isActive: boolean = currentChatId === card_data.id;

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: Доступность не требуется
    <li
      className={cn(
        "flex justify-between p-3 h-22.5 gap-2 hover:bg-(--border-dark) cursor-pointer",
        {
          "bg-(--border-active) pointer-events-none": isActive,
        },
      )}
      onClick={() => openChat(card_data.user_info, card_data.id)}
    >
      <div className="grid grid-cols-5">
        <div className="flex self-center size-11">
          <Image
            className="rounded-[50%] aspect-square"
            src={card_data.user_info.avatar_url ?? "./userAvatar.svg"}
            width={44}
            height={44}
            alt="Аватар чата"
          />
        </div>
        <div className="col-span-4 self-center w-full">
          <h2 className="text-lg truncate">
            {card_data.user_info.last_name
              ? `${card_data.user_info.first_name} ${card_data.user_info.last_name}`
              : card_data.user_info.first_name}
          </h2>
          <p className="text-base text-(--text-purple-color) truncate">
            {card_data.last_message?.content ?? "Сообщения отсутствуют"}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-evenly items-center">
        {card_data.last_message && (
          <p className="text-[0.725rem] text-(--text-purple-color) self-start">
            {new Date(
              card_data.last_message?.created_at ?? "",
            ).toLocaleDateString()}
          </p>
        )}
        {card_data.unread_count > 0 && (
          <span className="rounded-xl bg-(--accent-color) px-2">
            {card_data.unread_count}
          </span>
        )}
      </div>
    </li>
  );
};

export default ChatCard;
