import Link from "next/link";
import { Icon } from "@iconify/react";

export default function Login() {
  return (
    <div className="flex flex-col w-full items-center justify-center h-screen p-4">
      <div className="bg-[#FB9556]/70 rounded-[48px] p-8 w-full max-w-lg drop-shadow-md">
        <h2 className="text-6xl md:text-5xl text-black text-center mb-6">
          sign up
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
          <button className="w-1/3 py-3 rounded-full bg-[#FFCAA9]/70 tracking-wider text-white text-2xl md:text-3xl hover:bg-orange-300 transition mb-4">
            sign up
          </button>
        </div>

        <p className="text-center text-white text-lg md:text-xl ">
          Already have an account?{" "}
          <Link href="/login" className="ml-2 text-black hover:underline">
            log in
          </Link>
        </p>
      </div>

      {/* ไอคอนบ้าน */}
      <Link href="/settings" className="absolute bottom-4 left-4">
        <Icon
          icon="majesticons:settings-cog"
          className="w-[40px] h-[40px] md:w-[70px] md:h-[70px]"
          color="#4A5568"
        />
      </Link>
      <Link href="/" className="absolute bottom-4 right-4">
        <Icon
          icon="pixelarticons:home"
          className="w-[40px] h-[40px] md:w-[70px] md:h-[70px]"
          color="#4A5568"
        />
      </Link>
    </div>
  );
}