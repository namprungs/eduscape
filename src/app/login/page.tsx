import Link from "next/link";
import { Icon } from "@iconify/react";

export default function Login() {
  return (
    <div className="flex flex-col w-full items-center justify-center h-screen p-4">
      <div className="bg-[#9DE0F1]/70 rounded-[48px] p-8 w-full max-w-lg drop-shadow-md">
        <h2 className="text-6xl md:text-5xl text-black text-center mb-6">
          log in
        </h2>

        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col w-full gap-0.5">
            <div className="px-4 text-4xl md:text-4xl text-black">
              username
            </div>
            <input
              type="text"
              className="w-full py-3 px-4 rounded-full bg-[#FDFBFB]/70 text-black text-lg md:text-xl placeholder-black focus:outline-none"
            />
          </div>
          <div>
            <div className="px-4 text-4xl md:text-4xl text-black">
            password
            </div>
            <input
              type="password"
              className="w-full py-3 px-4 rounded-full bg-[#FDFBFB]/70 text-black text-lg md:text-xl placeholder-black focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button className="w-1/3 py-3 rounded-full bg-[#E9F6F9]/70 text-[#FB9556] text-2xl md:text-3xl font-bold hover:bg-orange-300 transition mb-4">
            log in
          </button>
        </div>

        <p className="text-center text-black text-lg md:text-xl ">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="ml-2 text-[#FB9556] hover:underline">
            Sign up
          </Link>
        </p>
      </div>

      <Link href="/settings" className="absolute bottom-4 left-4">
        <Icon icon="majesticons:settings-cog" width="40" height="40" color="#4A5568" />
      </Link>
      <Link href="/" className="absolute bottom-4 right-4">
        <Icon icon="pixelarticons:home" width="40" height="40" color="#4A5568" />
      </Link>
    </div>
  );
}