interface IProps {
    text: string;
    isActive: boolean;
    submitHandler?: () => void;
}

const SubmitButton = ({text, isActive, submitHandler}: IProps) => {
  return (
    <button
      disabled={!isActive}
      onClick={() => submitHandler?.()}
      type="submit"
      className="disabled:bg-(--primary-purple) disabled:cursor-auto disabled:text-gray-500 mt-3 py-2 px-6 bg-(--accent-color) hover:bg-(--light-purple) focus:outline-2 focus:outline-offset-1 focus:outline-(--accent-light-color) cursor-pointer w-full rounded-xl transition"
    >
      {text}
    </button>
  );
};

export default SubmitButton;