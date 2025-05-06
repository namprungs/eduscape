'use client'
import Link from "next/link";
import { Icon } from "@iconify/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {

  const router = useRouter();
  const { data: session, status } = useSession();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status,router]);

  const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true); // เริ่มแสดง LoadingProgress
      if (!username) {
        setError("Please Enter your username");
        setLoading(false); // ซ่อน LoadingProgress เนื่องจากเกิด error
        return;
      }
      if (!password) {
        setError("Please Enter your Password");
        setLoading(false); // ซ่อน LoadingProgress เนื่องจากเกิด error
        return;
      }

      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError("Invalid credentials");
        setLoading(false); // ซ่อน LoadingProgress เนื่องจากเกิด error
        return;
      }
      console.log("going to router");
      // setLoading(false)
      router.refresh();
      router.replace("/");
      // router.back()
    } catch (error) {
      console.log("Error from login" + error);
      setLoading(false); // ซ่อน LoadingProgress เนื่องจากเกิด error
    }
  };

  if(loading || status === "loading") {
    return (
      <div className="flex flex-col w-full items-center justify-center h-screen p-4">
        <div className="bg-[#9DE0F1]/70 rounded-[48px] p-8 w-full max-w-lg drop-shadow-md">
          <h2 className="text-6xl md:text-5xl text-black text-center mb-6">
            Loading...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full items-center justify-center h-screen p-4">
      <div className="bg-[#9DE0F1]/70 rounded-[48px] p-8 w-full max-w-lg drop-shadow-md">
        <h2 className="text-6xl md:text-5xl text-black text-center mb-6">
          log in
        </h2>
        <form onSubmit={handlerSubmit}>
          {error && (
            <div className="mb-4 text-red-500 text-lg md:text-xl text-center">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col w-full gap-0.5">
              <label htmlFor="username" className="px-4 text-4xl md:text-4xl text-black">
                username
              </label>
              <input
                id="username"
                name="username"
                value={username}
                type="text"
                required
                onChange={(e) => setUsername(e.target.value)}
                className="w-full py-3 px-4 rounded-full bg-[#FDFBFB]/70 text-black text-lg md:text-xl placeholder-black focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="password" className="px-4 text-4xl md:text-4xl text-black">
                password
              </label>
              <input
                id="password"
                name="password"
                value={password}
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  console.log(password);
                }}
                className="w-full py-3 px-4 rounded-full bg-[#FDFBFB]/70 text-black text-lg md:text-xl placeholder-black focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button type="submit" className="w-1/3 py-3 rounded-full bg-[#E9F6F9]/70 text-[#FB9556] text-2xl md:text-3xl font-bold hover:bg-orange-300 transition mb-4">
              log in
            </button>
          </div>
        </form>

        <p className="text-center text-black text-lg md:text-xl ">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="ml-2 text-[#FB9556] hover:underline">
            Sign up
          </Link>
        </p>
      </div>

      
      <Link href="/" className="absolute bottom-4 right-4 md:bottom-8 md:right-8">
        <Icon
          icon="pixelarticons:home"
          className="w-[40px] h-[40px] md:w-[70px] md:h-[70px]"
          color="#4A5568"
        />
      </Link>
    </div>
  );
}