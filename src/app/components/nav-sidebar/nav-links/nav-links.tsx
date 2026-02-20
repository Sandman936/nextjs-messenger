import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/app/lib/utils";

export interface TLink {
  component: ReactNode;
  path: string;
}

interface IProps {
  links: TLink[];
  activeLink: string;
}

const NavLinks = ({ links, activeLink }: IProps) => {
  return (
    <nav className="w-full">
      <ul className="flex flex-col w-full">
        {links.map((link) => (
          <li
            className="flex justify-center items-center w-full"
            key={link.path}
          >
            <Link
              className={cn(
                "p-5 duration-300 easy-in-out transition-colors hover:text-(--icon-color-light) hover:bg-(--dark-purple-accent) cursor-pointer before:absolute before:bg-(--accent-light-color) before:h-full before:-left-1 before:top-0",
                {
                  "text-(--icon-color-active) bg-(--primary-purple) pointer-events-none cursor-default translate-x-1 transition-transform  duration-300 ease-in-out before:w-1.5":
                    activeLink === link.path,
                },
              )}
              href={`${link.path}`}
            >
              {link.component}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavLinks;
