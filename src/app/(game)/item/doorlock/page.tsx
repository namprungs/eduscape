"use client";

import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import WinModal from "@/component/WinModal";
import { Session } from "@/types/User";

export default function DoorLockPage() {
  const [code, setCode] = useState<string>("");
  const { data: session } = useSession() as { data: Session | null };
  const [showWinModal, setShowWinModal] = useState(false); // New state for modal
  const router = useRouter();

  // Handle numpad button press
  const handleNumpadPress = async (digit: string) => {
    if (code.length < 6) {
      const newCode = code + digit;
      setCode(newCode);

      // Check if we've reached 4 digits
      if (newCode.length === 6) {
        try {
          const token = session?.user?.token
          if (!token) {
            alert("Please log in first.");
            return;
          }
          const apiUrl = process.env.BACKEND_URL || "http://localhost:3000/api/auth/login";

          const response = await fetch(apiUrl + '/submit_answer', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ puzzle_id: 7, answer: newCode }),
          });

          const result = await response.json();

          if (!result.correct) {
            alert(result.message);
            setCode("");
          } else {
            setShowWinModal(true);
          }
        } catch (error) {
          console.error('Error sending code:', error);
          alert("An error occurred. Please try again.");
          setCode("");
        }
      }
    }
  };

  // Adjusted numpad layout to match the image

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full bg-gray-100">
      {/* Full-page Door Lock Image */}
      <Image
        src="/images/doorlock.png"
        alt="Door Lock"
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
      />

      {/* Win Modal - Conditionally rendered */}
      {showWinModal && <WinModal />}

      <div className="relative z-10 flex flex-col items-center justify-center w-100 max-w-s ml-10">
        {/* Code Display - Centered above numpad */}
        <div className="w-full mb-2 flex justify-center">
          <div className="w-64 h-20 bg-green-500/20 text-white text-7xl font-mono flex items-center justify-center rounded-lg">
            {code.length > 0 ? "*".repeat(code.length) : "____"}
          </div>
        </div>
        {/* Empty space */}
        <div className="w-20 h-10 mb-4" />

        {/* Numpad Container */}
        <div className="grid grid-cols-3 w-full">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
            <button
              key={digit}
              onClick={() => handleNumpadPress(digit.toString())}
              className="w-23 h-23 bg-gray-200/30 hover:bg-gray-300/70 text-black text-3xl font-bold rounded-full flex items-center justify-center transition-colors active:scale-95 p-20px my-5 mx-2"
            >

            </button>
          ))}


          {/* Back Button - Only shown when router is available */}
          {typeof window !== 'undefined' && (
            <button
              onClick={() => router.back()}
              className="absolute bottom-[-4rem] right-0 w-16 h-16 bg-red-500/70 hover:bg-red-600/70 text-white text-3xl font-bold rounded-full flex items-center justify-center transition-colors mt-4"
            >
              ←
            </button>
          )}

        </div>
      </div>
    </div>
  );
}