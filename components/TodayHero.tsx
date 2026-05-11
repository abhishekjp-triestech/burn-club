'use client';

import { DayWorkout } from '@/lib/types';
import { useWorkoutCompletion } from '@/lib/useWorkoutCompletion';

interface TodayHeroProps {
  workout: DayWorkout;
  onOpen: () => void;
}

const typeConfig = {
  strength: {
    badge: 'S&C',
    label: 'text-blue-400',
    border: 'border-blue-500/50',
    bg: 'bg-blue-500/10',
    glow: 'shadow-blue-500/20',
    btnBg: 'bg-blue-500 hover:bg-blue-400',
    dot: 'bg-blue-400',
    fill: 'bg-blue-400',
  },
  hiit: {
    badge: 'HIIT',
    label: 'text-orange-400',
    border: 'border-orange-500/50',
    bg: 'bg-orange-500/10',
    glow: 'shadow-orange-500/20',
    btnBg: 'bg-orange-500 hover:bg-orange-400',
    dot: 'bg-orange-400',
    fill: 'bg-orange-400',
  },
  cycling: {
    badge: 'RIDE',
    label: 'text-green-400',
    border: 'border-green-500/50',
    bg: 'bg-green-500/10',
    glow: 'shadow-green-500/20',
    btnBg: 'bg-green-500 hover:bg-green-400',
    dot: 'bg-green-400',
    fill: 'bg-green-400',
  },
};

export default function TodayHero({ workout, onOpen }: TodayHeroProps) {
  const cfg = typeConfig[workout.type];
  const isCycling = workout.type === 'cycling';
  const totalExercises = workout.blocks.reduce((acc, b) => acc + b.exercises.length, 0);
  const { completed } = useWorkoutCompletion(workout.day);
  const completedMain = [...completed].filter(k => k.startsWith('block-')).length;
  const allDone = totalExercises > 0 && completedMain === totalExercises;

  return (
    <div className={`rounded-2xl border ${cfg.border} ${cfg.bg} shadow-xl ${cfg.glow} p-6 mb-8`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${cfg.dot} animate-pulse`} />
          <span className="text-xs font-bold tracking-widest text-neutral-400">TODAY</span>
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${cfg.label} bg-black/40 border ${cfg.border}`}>
          {cfg.badge}
        </span>
      </div>

      <h2 className={`text-3xl font-bold ${cfg.label} mb-1`}>{workout.label}</h2>

      {!isCycling ? (
        <div className="flex items-center gap-3 mt-2 mb-4">
          <span className="text-sm text-neutral-400">70 min</span>
          <span className="text-neutral-600">·</span>
          <span className="text-sm text-neutral-400">15 min mobility</span>
          <span className="text-neutral-600">·</span>
          <span className={`text-sm font-semibold tabular-nums ${allDone ? 'text-emerald-400' : 'text-neutral-400'}`}>
            {completedMain}/{totalExercises}
          </span>
        </div>
      ) : (
        <p className="text-sm text-neutral-400 mt-2 mb-6">Morning ride — keep it zone 2, steady effort</p>
      )}

      {!isCycling && (
        <>
          <div className="mb-5 h-1 bg-black/30 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${allDone ? 'bg-emerald-400' : cfg.fill}`}
              style={{ width: `${totalExercises > 0 ? (completedMain / totalExercises) * 100 : 0}%` }}
            />
          </div>
          <button
            onClick={onOpen}
            className={`w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200 active:scale-[0.98] ${cfg.btnBg} shadow-lg`}
          >
            {allDone ? 'Workout Complete ✓' : 'Open Today\'s Workout'}
          </button>
        </>
      )}
    </div>
  );
}
