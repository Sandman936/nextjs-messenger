const ChatCard = () => {
  return (
    <li className="flex rounded-md justify-between animate-pulse p-3 h-22.5 gap-2">
      <div className="flex self-center size-11 rounded-[50%] bg-(--border-dark) aspect-square" />
      <div className="grid grid-cols-4 gap-5 w-full">
        <div className="flex flex-col self-center w-full h-full gap-3 py-2 col-span-3">
          <h2 className="w-full h-full bg-(--border-dark) rounded" />
          <p className="bg-(--border-dark) w-full h-full rounded" />
        </div>
        <div className="flex flex-col justify-evenly items-center w-full h-full gap-3 py-2">
          <p className="bg-(--border-dark) self-start w-full h-full rounded" />
          <span className="bg-(--border-dark) w-full h-full rounded" />
        </div>
      </div>
    </li>
  );
};

export default ChatCard;
