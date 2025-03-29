import { Icon } from "@iconify/react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 md:gap-8 h-screen px-4">
      <div className="flex items-center gap-2 md:gap-3">
        <h1 className="text-[60px] md:text-[130px] text-[#003366] tracking-wide [text-shadow:_2px_2px_0px_rgba(0,0,0,0.3)] md:[text-shadow:_4px_4px_0px_rgba(0,0,0,0.3)]">
          EduScape
        </h1>
        <Icon
          icon="pixel:search"
          width="60"
          height="60"
          color="#003366"
          className="md:w-[130px] md:h-[130px]"
        />
      </div>

      <div className="flex flex-col gap-3 md:gap-6 w-full max-w-[600px] md:w-[70%]">
        <div className="flex gap-2 md:gap-4">
          <Link href="/login" className="flex-1">
            <button className="w-full py-2 md:py-4 rounded-full bg-[#9DE0F1]/70 text-[#FB9556] text-2xl md:text-5xl hover:bg-[#9DE0F1] hover:bg-opacity-90 transition-all duration-200">
              log in
            </button>
          </Link>
          <Link href="/signup" className="flex-1">
            <button className="w-full py-2 md:py-4 rounded-full bg-[#FB9556]/70 text-[#EAFBFF] text-2xl md:text-5xl hover:bg-[#FB9556] hover:bg-opacity-90 transition-all duration-200">
              sign up
            </button>
          </Link>
        </div>

        <Link href="/game">
          <button className="w-full py-2 md:py-4 rounded-full bg-[#7FFD81]/70 text-black text-2xl md:text-5xl hover:bg-[#7FFD81] hover:bg-opacity-90 transition-all duration-200">
            start game
          </button>
        </Link>

        <Link href="/stats">
          <button className="flex justify-center items-center gap-2 w-full py-2 md:py-4 rounded-full bg-[#DFA4FD]/70 text-black text-2xl md:text-5xl hover:bg-[#DFA4FD] hover:bg-opacity-90 transition-all duration-200">
            stats
            <Icon
              icon="oui:token-histogram"
              width="40"
              height="40"
              color="black"
              className="md:w-[60px] md:h-[60px]"
            />
          </button>
        </Link>
      </div>
      <Link href="/settings" className="absolute bottom-4 left-4 md:bottom-25 md:left-30">
        <Icon
          icon="majesticons:settings-cog"
          className="w-[40px] h-[40px] md:w-[80px] md:h-[80px]"
          color="#4A5568"
        />
      </Link>
    </div>
  );
}