'use client';

import { useState } from 'react';
import { weekWorkouts } from '@/lib/workouts';
import { DayWorkout } from '@/lib/types';
import DayCard from '@/components/DayCard';
import WorkoutModal from '@/components/WorkoutModal';

const DAYS_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function getTodayDayName(): string {
  return new Date().toLocaleDateString('en-US', { weekday: 'long' });
}

export default function Home() {
  const [selected, setSelected] = useState<DayWorkout | null>(null);
  const today = getTodayDayName();

  const strengthDays = weekWorkouts.filter((w) => w.type === 'strength').length;
  const hiitDays = weekWorkouts.filter((w) => w.type === 'hiit').length;

  return (
    <main className="min-h-screen bg-[#111] text-white">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Burn Club 🔥</h1>
          <p className="text-neutral-400 text-sm mt-1">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>

          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="text-xs text-neutral-400">{strengthDays} S&C</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-orange-400" />
              <span className="text-xs text-neutral-400">{hiitDays} HIIT</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-xs text-neutral-400">2 Zone 2 rides</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {DAYS_ORDER.map((dayName) => {
            const workout = weekWorkouts.find((w) => w.day === dayName)!;
            return (
              <DayCard
                key={dayName}
                workout={workout}
                isToday={dayName === today}
                onClick={() => setSelected(workout)}
              />
            );
          })}
        </div>

        <p className="text-center text-xs text-neutral-600 mt-8">
          Tap any training day to see the full workout
        </p>
      </div>

      {selected && (
        <WorkoutModal workout={selected} onClose={() => setSelected(null)} />
      )}
    </main>
  );
}
