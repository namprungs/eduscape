'use client'

interface TimerProps {
  timeLeft: number;
}

const Timer = ({timeLeft}:TimerProps) => {


  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };


  return (
    
    <div className="fixed top-8 left-7 w-[150px] bg-[#E9F6F9]  py-4 px-6 rounded-full shadow-lg ">
      <p className="text-6xl text-black text-center">{formatTime(timeLeft)}</p>
    </div>

  );
};

export default Timer;
