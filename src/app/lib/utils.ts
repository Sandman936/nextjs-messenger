import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function convertBlobUrlToFile(blobUrl: string) {
	const response = await fetch(blobUrl);
	const blob = await response.blob();
	const fileName = Math.random().toString(36).slice(2, 9);
	const mimeType = blob.type || "application/octet-stream";
	const file = new File([blob], `${fileName}.${mimeType.split("/")[1]}`, {
		type: mimeType,
	});
	return file;
}

export const formatErrors = (error: string) => {
	switch (error) {
		case "Invalid login credentials":
			return "Неверное имя пользователя или пароль";
		case "Email not confirmed":
			console.log("Email not confirmed");
			return "E-mail не подтвержден";
		default:
			return error;
	}
};
