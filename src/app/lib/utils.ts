import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { IMessage } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertBlobUrlToFile = async (blobUrl: string) => {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const fileName = Math.random().toString(36).slice(2, 9);
  const mimeType = blob.type || "application/octet-stream";
  const file = new File([blob], `${fileName}.${mimeType.split("/")[1]}`, {
    type: mimeType,
  });
  return file;
};

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

//TO DO: Поменять потом проверку имени на проверку id пользователя
export const showUsername = (
  currentMessage: IMessage,
  prevMessage: IMessage | null,
) => {
  return (
    !prevMessage ||
    prevMessage.user.first_name !== currentMessage.user.first_name
  );
};
