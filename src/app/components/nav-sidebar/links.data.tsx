import { MessageCircleMore, Settings, UsersRound } from "lucide-react";
import { USER_ROUTES } from "@/app/constants/routes";
import type { TLink } from "./nav-links/nav-links";

const linksArray: TLink[] = [
	{
		component: <MessageCircleMore size={30} />,
		path: USER_ROUTES.MAIN_PAGE,
	},
	{
		component: <UsersRound size={30} />,
		path: USER_ROUTES.CONTACTS,
	},
	{
		component: <Settings size={30} />,
		path: USER_ROUTES.SETTINGS,
	},
];

export default linksArray;
