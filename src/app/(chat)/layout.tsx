import { ReactNode } from "react";

export default function ChatLayout({ children }: { children: ReactNode }) {
  return (
  <div>
    <h1>Side Bar</h1>
    {children}
    <h2>ActiveChat</h2>
  </div>
);
}