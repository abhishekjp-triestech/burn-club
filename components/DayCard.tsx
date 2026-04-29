'use client';

import { DayWorkout } from '@/lib/types';

interface DayCardProps {
  workout: DayWorkout;
  isToday: boolean;
  onClick: () => void;
}

const typeConfig = {
  strength: {
    badge: 'S&C',
    color: 'text-blue-400',
    border: 'border-blue-500/40',
    bg: 'bg-blue-500/10',
    dot: 'bg-blue-400',
    todayBorder: 'border-blue-400',
  },
  hiit: {
    badge: 'HIIT',
    color: 'text-orange-400',
    border: 'border-orange-500/40',
    bg: 'bg-orange-500/10',
    dot: 'bg-orange-400',
    todayBorder: 'border-orange-400',
  },
  cycling: {
    badge: 'RIDE',
    color: 'text-green-400',
    border: 'border-green-500/40',
    bg: 'bg-green-500/10',
    dot: 'bg-green-400',
    todayBorder: 'border-green-400',
  },
};

export default function DayCard({ workout, isToday, onClick }: DayCardProps) {
  const cfg = typeConfig[workout.type];
  const isCycling = workout.type === 'cycling';

  return (
    <button
      onClick={isCycling ? undefined : onClick}
      className={`
        w-full text-left rounded-xl border p-4 transition-all duration-200
        ${cfg.border} ${cfg.bg}
        ${isToday ? `ring-2 ring-offset-2 ring-offset-[#111] ${cfg.todayBorder} ring-${cfg.dot.replace('bg-', '')}` : ''}
        ${isCycling ? 'cursor-default opacity-70' : 'hover:brightness-110 hover:scale-[1.02] active:scale-[0.99] cursor-pointer'}
      `}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold tracking-widest text-neutral-400">
          {workout.shortDay}
        </span>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${cfg.color} bg-black/30`}>
          {cfg.badge}
        </span>
      </div>

      <p className={`font-semibold text-sm ${cfg.color}`}>{workout.label}</p>

      {!isCycling && (
        <p className="text-xs text-neutral-500 mt-1">{workout.totalMinutes} min</p>
      )}

      {isCycling && (
        <p className="text-xs text-neutral-500 mt-1">Morning ride</p>
      )}

      {isToday && (
        <div className={`mt-3 flex items-center gap-1.5`}>
          <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot} animate-pulse`} />
          <span className="text-xs text-neutral-400">Today</span>
        </div>
      )}
    </button>
  );
}
