import { Info, UserRoundPlus } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/app/contexts/auth-context";
import Status from "../../shared/status/status";

const ChatHeader = () => {
  const { user: user_info, isLoading } = useAuth();

  return (
    <div className="bg-background flex justify-between px-6 py-3 items-center border-b-2 border-(--border-light)">
      <div className="flex gap-3">
        <div className="aspect-square">
          <Image
            className="rounded-[50%] aspect-square object-cover"
            src={
              user_info?.avatar_url ? user_info?.avatar_url : "./userAvatar.svg"
            }
            width={44}
            height={44}
            alt="Аватар пользователя"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">{!isLoading ? `${user_info?.first_name} ${user_info?.last_name}`: 'Загрузка...'}</h2>
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
