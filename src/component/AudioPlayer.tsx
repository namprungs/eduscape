// src/component/AudioPlayer.tsx
"use client";
import { useCallback, useEffect, useState } from "react";
const audio = typeof window !== "undefined" ? new Audio("/sound/bgmusic.mp3") : null;

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // ฟังก์ชันเริ่มเล่น audio
  const startAudio = useCallback(() => {
    if (audio && !isPlaying) {
      audio.loop = true;
      audio.volume = 0.5;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          console.log("Audio is playing");
        })
        .catch((error) => console.error("Error playing audio:", error));
    }
  }, [isPlaying]);

  // ตรวจจับ user interaction
  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        startAudio();
      }
    };

    // เพิ่ม event listeners สำหรับ interaction
    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);
    
    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, [hasInteracted, startAudio]);

  // Cleanup เมื่อ component unmount
  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  // แสดง UI ควบคุมถ้าต้องการ
  return (
    <div className="display-none">
      {!isPlaying && (
        <button onClick={startAudio} hidden className="display-none">
          Play Background Music
        </button>
      )}
    </div>
  );
}

// Optional: export ฟังก์ชันควบคุม
export const pauseAudio = (setIsPlaying:(a:boolean)=>void) => {
  if (audio) {
    audio.pause();
    setIsPlaying(false); // ต้องหาวิธีอัพเดท state ถ้าใช้จากที่อื่น
  }
};
export const playAudio = () => audio?.play();