import { Info, UserRoundPlus } from "lucide-react";

import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";

// import type { IUserProfile } from "@/app/lib/types";
// import Status from "../../shared/status/status";

interface IProps {
  // user_info: IUserProfile | null;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
}

const ChatHeader = ({ username, setUsername }: IProps) => {
  return (
    <div className="bg-background flex justify-between px-6 py-3 items-center border-b-2 border-(--border-light)">
      <div className="flex gap-3">
        <div className="aspect-square">
          <Image
            className="rounded-[50%] aspect-square object-cover"
            src="./userAvatar.svg"
            width={44}
            height={44}
            alt="Аватар пользователя"
          />
        </div>
        <div className="flex">
          {/* <h2 className="text-lg font-semibold">Миша Шапкин</h2>
          <Status /> */}
          <input
            autoComplete="off"
            type="text"
            id="username-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Укажите ваше имя"
            className="bg-white text-(--text-primary-color) placeholder:text-(--text-secondary-color) rounded-md px-2 py-1 focus:outline-2 focus:outline-(--accent-color) w-full"
          />
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
