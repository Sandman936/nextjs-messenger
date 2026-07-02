import Image from 'next/image';

export const ChangeProfileFormSkeleton = () => {

  return (
    <div className="flex flex-col items-center gap-6 animate-pulse">
      <Image
        className="rounded-[50%] aspect-square object-cover"
        src={"./userAvatar.svg"}
        width={210}
        height={210}
        alt="Аватар пользователя"
        priority
      />
      <div className="grid grid-cols-1 gap-4 w-full h-[108px]">
        <div className="flex flex-col self-center w-full h-full col-span-1 bg-(--border-dark) rounded" />
        <div className="flex flex-col self-center w-full h-full col-span-1 bg-(--border-dark) rounded" />
        <div className="flex flex-col self-center w-full h-full col-span-1 bg-(--border-dark) rounded" />
      </div>
    </div>
  );
};
