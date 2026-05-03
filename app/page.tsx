'use client';

import { useState } from 'react';
import { weekWorkouts } from '@/lib/workouts';
import { DayWorkout } from '@/lib/types';
import DayCard from '@/components/DayCard';
import TodayHero from '@/components/TodayHero';
import WorkoutModal from '@/components/WorkoutModal';

const DAYS_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function getTodayDayName(): string {
  return new Date().toLocaleDateString('en-US', { weekday: 'long' });
}

export default function Home() {
  const [selected, setSelected] = useState<DayWorkout | null>(null);
  const today = getTodayDayName();
  const todayWorkout = weekWorkouts.find((w) => w.day === today) ?? weekWorkouts[0];
  const otherDays = DAYS_ORDER.filter((d) => d !== today);

  return (
    <main className="min-h-screen bg-[#111] text-white">
      <div className="max-w-2xl mx-auto px-4 pt-10 pb-16">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Burn Club</h1>
          <p className="text-neutral-500 text-sm mt-1">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Today hero */}
        <TodayHero
          workout={todayWorkout}
          onOpen={() => setSelected(todayWorkout)}
        />

        {/* Rest of week */}
        <p className="text-xs font-bold tracking-widest text-neutral-500 mb-3">THIS WEEK</p>
        <div className="grid grid-cols-3 gap-2.5">
          {otherDays.map((dayName) => {
            const workout = weekWorkouts.find((w) => w.day === dayName)!;
            return (
              <DayCard
                key={dayName}
                workout={workout}
                isToday={false}
                onClick={() => setSelected(workout)}
              />
            );
          })}
        </div>

      </div>

      {selected && (
        <WorkoutModal workout={selected} onClose={() => setSelected(null)} />
      )}
    </main>
  );
}
