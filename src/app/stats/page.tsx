import Link from "next/link";
import { Icon } from "@iconify/react";
import * as Progress from "@radix-ui/react-progress";

export default function Stats() {
  const subjects = [
    { name: "Physics", progress: 85 },
    { name: "Chemistry", progress: 70 },
    { name: "Biology", progress: 90 },
    { name: "Math", progress: 65 },
    { name: "Thai", progress: 30 },
    { name: "English", progress: 0 },
    { name: "Social", progress: 60 },
  ];

  const getProgressColor = (progress: number) => {
    if (progress <= 33) return "bg-[#FB5656]"; // สีแดง
    if (progress <= 66) return "bg-[#FAF48D]"; // สีเหลือง
    return "bg-[#7FFD81]"; // สีเขียว
  };

  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen p-4">
      <div className="bg-[#DFA4FD]/70 rounded-[48px] px-12 py-6 w-full max-w-xl drop-shadow-md">
        <div className="flex justify-center items-center text-5xl text-black text-center mb-6">
          <h2>stats</h2>
          <Icon
            icon="oui:token-histogram"
            width="48"
            height="48"
            color="black"
            className="ml-2"
          />
        </div>

        <div className="flex flex-col gap-4">
          {subjects.map((subject) => (
            <div key={subject.name} className="flex items-center gap-2">
              <span className="text-2xl text-black flex-shrink-0 w-24">
                {subject.name}
              </span>

              <Progress.Root
                className="flex-grow h-4 bg-[#D9D9D9] rounded-full transition-all duration-300 overflow-hidden"
                value={subject.progress}
              >
                <Progress.Indicator
                  className={`h-full transition-all duration-300 ${getProgressColor(
                    subject.progress
                  )}`}
                  style={{ width: `${subject.progress}%` }}
                />
              </Progress.Root>

              <span className="text-2xl text-black flex-shrink-0 w-12 text-right">
                {subject.progress}%
              </span>
            </div>
          ))}
        </div>
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