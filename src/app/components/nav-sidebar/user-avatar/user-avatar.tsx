import Image from "next/image";
import Link from "next/link";
import { USER_ROUTES } from "@/app/constants/routes";
import { cn } from "@/app/lib/utils";

interface IProps {
	avatarImage: string | null;
	activeLink: string;
}

const UserAvatar = ({ avatarImage, activeLink }: IProps) => {
	return (
		<Link
			className={cn(
				"p-3.75 duration-300 easy-in-out transition-colors hover:text-(--icon-color-light) hover:bg-(--dark-purple-accent) cursor-pointer before:absolute before:bg-(--accent-light-color) before:h-full before:-left-1 before:top-0",
				{
					"text-(--icon-color-active) bg-(--primary-purple) pointer-events-none cursor-default translate-x-1 transition-transform  duration-300 ease-in-out before:w-1.5":
						activeLink === USER_ROUTES.PROFILE,
				},
			)}
			href={USER_ROUTES.PROFILE}
		>
			<div className="flex justify-center items-center w-full rounded-[50%]">
				<Image
					className="rounded-[50%] aspect-square object-cover"
					src={avatarImage ? avatarImage : "./userAvatar.svg"}
					alt="Изображение фото пользователя"
					width={40}
					height={40}
					priority
				/>
			</div>
		</Link>
	);
};

export default UserAvatar;
