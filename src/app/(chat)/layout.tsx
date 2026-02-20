import type { ReactNode } from "react";

import CurrentChatPage from "../components/current-chat/current-chat";
import NavSidebar from "../components/nav-sidebar/nav-sidebar";

export default function ChatLayout({ children }: { children: ReactNode }) {
  return (
    <main className="h-full w-full max-h-225 max-w-300 grid grid-cols-[auto_3.5fr_7.5fr]">
      <NavSidebar />
      <section className="w-full h-full">{children}</section>
      <CurrentChatPage />
    </main>
  );
}
