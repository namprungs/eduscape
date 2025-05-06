'use client'
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import userRegister from "@/lib/userRegister";
import { signIn } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const userName = name.trim().toLowerCase();
      const userPassword = password.trim().toLowerCase();
      if (!password || !name) {
        setError("Please enter complete information.");
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError("Password must have more than 6 ");
        setLoading(false);
        return;
      }

      console.log("entry to register",name,password);
      const user = await userRegister(name, password);
      console.log({ user });
      if (!user) {
        setError("Register Error");
        setLoading(false);
        return;
      }

      if (user.success === false) {
        setError("This email is already use.");
        setLoading(false);
        return;
      }
      console.log("go kub");
      const res = await signIn("credentials", {
        username: userName,
        password: userPassword,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid credentials");
        setLoading(false);
        return;
      }

      console.log("going to router");
      router.refresh();
      router.replace("/");
    } catch (error) {
      console.log("Error from login" + error);
      setLoading(false);
    }
  };

  if(loading) {
    return (
      <div className="flex flex-col w-full items-center justify-center h-screen p-4">
        <div className="bg-[#FB9556]/70 rounded-[48px] p-8 w-full max-w-lg drop-shadow-md">
          <h2 className="text-6xl md:text-5xl text-black text-center mb-6">
            Loading...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full items-center justify-center h-screen p-4">
      <div className="bg-[#FB9556]/70 rounded-[48px] p-8 w-full max-w-lg drop-shadow-md">
        <h2 className="text-6xl md:text-5xl text-black text-center mb-6">
          sign up
        </h2>
        <form onSubmit={handlerSubmit}>
          {error && (
            <div className="bg-red-200 text-red-800 px-4 py-2 rounded-md mb-4">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col w-full gap-0.5">
              <div className="px-4 text-4xl md:text-4xl text-black">
                username
              </div>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="w-full py-3 px-4 rounded-full bg-[#FDFBFB]/70 text-black text-lg md:text-xl placeholder-black focus:outline-none"

              />
            </div>
            <div>
              <div className="px-4 text-4xl md:text-4xl text-black">
                password
              </div>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 px-4 rounded-full bg-[#FDFBFB]/70 text-black text-lg md:text-xl placeholder-black focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button className="w-1/3 py-3 rounded-full bg-[#FFCAA9]/70 tracking-wider text-white text-2xl md:text-3xl hover:bg-orange-300 transition mb-4">
              sign up
            </button>
          </div>
        </form>

        <p className="text-center text-white text-lg md:text-xl ">
          Already have an account?{" "}
          <Link href="/login" className="ml-2 text-black hover:underline">
            log in
          </Link>
        </p>
      </div>

      {/* ไอคอนบ้าน */}
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