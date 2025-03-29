'use client';
import Link from "next/link";
import { Icon } from "@iconify/react";
import * as Progress from "@radix-ui/react-progress";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // If using NextAuth.js

interface SubjectStat {
  subject: string;
  Solved: number;
  Total: number;
  percentage: number;
}

interface StatsResponse {
  subject_stats: Record<string, SubjectStat>;
  current_streak: number;
  best_streak: number;
  last_solved_at: string;
}

export default function Stats() {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession(); // Get auth session

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/stats', {
          headers: {
            'Authorization': `Bearer ${session?.user?.token}`// Use your token
          }
        });
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data: StatsResponse = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    if (session) { // Only fetch if session exists
      fetchStats();
    }
  }, [session]);

  const getProgressColor = (progress: number) => {
    if (progress <= 33) return "bg-[#FB5656]"; // สีแดง
    if (progress <= 66) return "bg-[#FAF48D]"; // สีเหลือง
    return "bg-[#7FFD81]"; // สีเขียว
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">Loading stats...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">No stats available</div>
      </div>
    );
  }

  // Convert subject_stats object to array
  const subjects = Object.values(stats.subject_stats);

  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen p-4">
      <div className="bg-[#DFA4FD]/70 rounded-[48px] px-12 py-6 w-full max-w-xl drop-shadow-md">
        {/* Streak Info with Fire Icon */}
        <div className="flex items-center justify-between mb-3 p-2 rounded-full">
          <div className="flex items-center gap-2">
            <Icon
              icon="pixel:fire-solid"
              className="w-8 h-8 text-orange-500 animate-pulse" // Added animation
            />
            <span className="text-xl">
              Current Streak : <span className="font-bold text-2xl text-orange-600">{stats.current_streak}</span>
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Icon
              icon="mdi:trophy" // Trophy icon for best streak
              className="w-8 h-8 text-yellow-500"
            />
            <span className="text-xl">
              Best : <span className="font-bold text-2xl text-yellow-600">{stats.best_streak}</span>
            </span>
          </div>
        </div>

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
            <div key={subject.subject} className="flex items-center gap-2">
              <span className="text-2xl text-black flex-shrink-0 w-24">
                {subject.subject}
              </span>

              <Progress.Root
                className="flex-grow h-4 bg-[#D9D9D9] rounded-full transition-all duration-300 overflow-hidden"
                value={subject.percentage}
              >
                <Progress.Indicator
                  className={`h-full transition-all duration-300 ${getProgressColor(
                    subject.percentage
                  )}`}
                  style={{ width: `${subject.percentage}%` }}
                />
              </Progress.Root>

              <span className="text-2xl text-black flex-shrink-0 w-12 text-right">
                {subject.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>

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