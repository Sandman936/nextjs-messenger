import { Search } from "lucide-react";
import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";
import { USER_ROUTES } from "@/app/constants/routes";

interface IProps {
  placeholder?: string;
  addButton?: boolean;
  onChangeHandler?: Dispatch<SetStateAction<string>>;
}

const SearchBar = ({ placeholder = "", addButton = false, onChangeHandler }: IProps) => {
  return (
    <div className="flex justify-between p-4 gap-2.5 text-(--text-purple-color)">
      <div className="relative w-full">
        <Search size={14} className="absolute inset-[15px_10px]" />
        <input
          placeholder={placeholder}
          type="text"
          name="search"
          onChange={(event) => onChangeHandler ? onChangeHandler(event.target.value) : null}
          className="focus:outline-(--accent-color) duration-300 easy-in-out transition-colors outline-3 outline-(--dark-purple) outline-solid placeholder-(--text-purple-color) text-white text-base bg-(--dark-purple) rounded-full p-[10px_10px_10px_32px] w-full"
        />
      </div>
      {addButton && (
        <Link href={USER_ROUTES.CONTACTS}>
          <button
            type="button"
            className="h-full px-4 bg-(--dark-purple) text-2xl rounded-full cursor-pointer focus:font-semibold focus:text-(--accent-color) focus:outline-(--accent-color) duration-300 easy-in-out transition-colors outline-3 outline-(--dark-purple) outline-solid hover:text-(--text-light-color) hover:bg-(--dark-purple-accent) hover:outline-(--dark-purple-accent)"
          >
            +
          </button>
        </Link>
      )}
    </div>
  );
};

export default SearchBar;
