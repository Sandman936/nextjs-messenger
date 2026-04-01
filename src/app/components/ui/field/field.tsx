import type { Dispatch, SetStateAction } from "react";
import { cn } from "@/app/lib/utils";

interface IProps {
  desc?: string;
  isRequired?: boolean;
  autoCompleteType?: string;
  type?: string;
  id: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeHolder?: string;
  maxWidth?: number | null;
}

const Field = ({
  desc,
  isRequired = false,
  autoCompleteType = "off",
  type = "text",
  id,
  value,
  setValue,
  placeHolder = "",
  maxWidth = null,
}: IProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        maxWidth ? `max-w-[${maxWidth}]` : "w-full",
      )}
    >
      {desc && (
        <label htmlFor={id} className="text-sm text-(--text-light-color)">
          {desc}
        </label>
      )}
      <input
        required={isRequired}
        autoComplete={autoCompleteType}
        type={type}
        id={id}
        value={value}
        name={id}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeHolder}
        className="bg-white text-(--text-primary-color) placeholder:text-gray-500 rounded-md px-2 py-1 focus:outline-2 focus:outline-(--accent-color)"
      />
    </div>
  );
};

export default Field;
