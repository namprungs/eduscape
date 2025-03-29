'use client'; // Add this since we're using hooks
import type { Metadata } from "next";
import "../globals.css";
import Timer from "@/component/Timer";
import { useState, useEffect } from "react";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [timeLeft, setTimeLeft] = useState(300); // Example: 10 minutes (600 seconds)

  useEffect(() => {
    // Only run the timer if timeLeft > 0
    if (timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    // Cleanup interval on unmount or when timeLeft changes
    return () => clearInterval(timerId);
  }, [timeLeft]);

  return (
    <>
    {/* <div className="relative min-h-screen text-white flex flex-col items-center justify-center"> */}
      {children}
      <Timer timeLeft={timeLeft} />
    {/* </div> */}
    </>
  );
}