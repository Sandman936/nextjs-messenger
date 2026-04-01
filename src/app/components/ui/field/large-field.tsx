import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface IProps {
    desc?: string;
    isRequired?: boolean;
    autoCompleteType?: string;
    type?: string;
    id: string;
    value: string;
    placeHolder?: string;
    maxWidth?: number | null;
    onChangeHandler?: (e: ChangeEvent<HTMLInputElement>, inputName: string) => void;
    fieldName: string;
}

const LargeField = ({
  desc,
  isRequired = false,
  autoCompleteType = "off",
  type = "text",
  id,
  value,
  placeHolder = "",
  maxWidth = null,
  onChangeHandler,
  fieldName,
}: IProps) => {
  return (
    <div
      className="flex flex-col gap-1"
      style={{ maxWidth: maxWidth ?? "auto" }}
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
        onChange={(e) => {
          onChangeHandler ? onChangeHandler(e, fieldName) : null;
        }}
        placeholder={placeHolder}
        className="bg-white text-lg font-semibold text-(--text-primary-color) placeholder:text-gray-500 rounded-md px-2 py-1 focus:outline-2 focus:outline-(--accent-color)"
      />
    </div>
  );
};

export default LargeField;