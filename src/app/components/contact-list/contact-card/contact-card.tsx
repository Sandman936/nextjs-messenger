import Image from "next/image";
import { useCurrentChat } from "@/app/contexts/current-chat-context";
import type { IUserInfo } from "@/app/lib/types";
import { cn } from "@/app/lib/utils";

interface IProps {
  card_data: IUserInfo;
}

const ContactCard = ({ card_data }: IProps) => {
  const { openChat, currentChatId } = useCurrentChat();

  const isActive: boolean = currentChatId === card_data.id;

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: Доступность не требуется
    <li
      className={cn(
        "flex justify-between p-3 h-22.5 hover:bg-(--border-dark) cursor-pointer hover:z-10",
        {
          "bg-(--border-active) pointer-events-none": isActive,
        },
      )}
      onClick={() => openChat(card_data)}
    >
      <div className="flex gap-3">
        <div className="flex self-center size-11">
          <Image
            className="rounded-[50%]"
            src="./userAvatar.svg"
            width={44}
            height={44}
            alt="Аватар контакта"
          />
        </div>
        <div className="flex flex-col self-center">
          <h2 className="text-lg">
            {card_data.last_name
              ? `${card_data.first_name} ${card_data.last_name}`
              : card_data.first_name}
          </h2>
          <p className="text-base text-(--text-purple-color)">В сети</p>
        </div>
      </div>
    </li>
  );
};

export default ContactCard;
