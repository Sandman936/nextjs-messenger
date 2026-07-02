"use client";

import Image from "next/image";
import React from "react";
import type { IMessageComponent } from "@/app/lib/types";
import { cn } from "@/app/lib/utils";

const Message = React.memo(
  ({ user, text, isOwnMessage, showSender, createdAt }: IMessageComponent) => {
    return (
      <div
        className={cn("flex mt-2 justify-start gap-2", {
          "justify-end": isOwnMessage,
        })}
      >
        <div
          className={cn("max-w-[75%] w-fit flex flex-col gap-1", {
            "items-end": isOwnMessage,
          })}
        >
          {showSender && (
            <div
              className={cn("flex items-center gap-2 text-xl", {
                "justify-end flex-row-reverse": isOwnMessage,
              })}
            >
              <span className={"font-medium"}>
                {user
                  ? `${user.first_name} ${user.last_name}`
                  : "Неизвестный пользователь"}
              </span>
              <span className="text-sm">
                {new Date(createdAt).toLocaleTimeString("ru-RU", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          )}
          <div
            className={cn(
              "py-2 px-3 rounded-xl text-lg w-fit",
              isOwnMessage
                ? "bg-(--accent-light-color) text-foreground"
                : "bg-(--text-secondary-color) text-(--text-primary-color)",
            )}
          >
            {text}
          </div>
        </div>
        {showSender && (
          <div
            className={cn("flex aspect-square self-start", {
              "order-1": isOwnMessage,
            })}
          >
            <Image
              className="rounded-[50%] aspect-square"
              src="./userAvatar.svg"
              width={36}
              height={36}
              alt="Аватар пользователя"
            />
          </div>
        )}
      </div>
    );
  },
);
export default Message;
