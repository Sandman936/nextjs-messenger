import { Info, UserRoundPlus } from "lucide-react";
import Image from "next/image";
import { useCurentChat } from "@/app/contexts/current-chat-context";
import Status from "../../shared/status/status";

const ChatHeader = () => {
  const {currentChatUserInfo: chosenUser} = useCurentChat();

  return (
    <div className="bg-background flex justify-between px-6 py-3 items-center border-b-2 border-(--border-light)">
      <div className="flex gap-3">
        <div className="aspect-square">
          <Image
            className="rounded-[50%] aspect-square object-cover"
            src={"./userAvatar.svg"}
            width={44}
            height={44}
            alt="Аватар пользователя"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">{`${chosenUser?.first_name} ${chosenUser?.last_name}`}</h2>
          <Status />
        </div>
      </div>
      <div className="flex gap-5">
        <UserRoundPlus size={30} />
        <Info size={30} />
      </div>
    </div>
  );
};

export default ChatHeader;
