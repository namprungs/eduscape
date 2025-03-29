// app/game/layout.tsx
import { jersey10 } from "@/font/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Game Page",
  description: "Welcome to the game section!",
};

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        {children}
    </div>
  );
}
