"use client";

import { LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";
import linksArray from "./links.data";
import NavLinks from "./nav-links/nav-links";
import UserAvatar from "./user-avatar/user-avatar";

const NavSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="flex items-center justify-between flex-col py-3.75 bg-(--dark-purple) text-(--icon-color) border-r-2 border-(--border-dark)">
      <div className="flex flex-col gap-6 w-full">
        <UserAvatar
          activeLink={pathname}
          avatarImage={/*profileData?.avatar_url ?? */ null}
        />
        <NavLinks activeLink={pathname} links={linksArray} />
      </div>
      <button
        type="button"
        onClick={() => {
          handleLogout();
        }}
        className="active:text-(--icon-color-active) active:bg-(--border-dark) cursor-pointer duration-300 easy-in-out transition-colors hover:text-(--icon-color-light) hover:bg-(--dark-purple-accent) p-5"
      >
        <LogOut size={30} />
      </button>
    </aside>
  );
};

export default NavSidebar;
