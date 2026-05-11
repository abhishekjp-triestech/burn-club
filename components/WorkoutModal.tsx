'use client';

import { useCallback, useEffect, useState } from 'react';
import { DayWorkout, Block, Exercise } from '@/lib/types';

interface WorkoutModalProps {
  workout: DayWorkout;
  onClose: () => void;
}

const typeColors = {
  strength: 'text-blue-400',
  hiit: 'text-orange-400',
  cycling: 'text-green-400',
};

const blockTypeLabel = {
  superset: 'SUPERSET',
  circuit: 'CIRCUIT',
  interval: 'INTERVALS',
  finisher: 'FINISHER',
};

function useWorkoutCompletion(day: string) {
  const today = new Date().toISOString().slice(0, 10);
  const storageKey = `burn-club-${today}-${day}`;

  const [completed, setCompleted] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? new Set(JSON.parse(stored) as string[]) : new Set();
    } catch {
      return new Set();
    }
  });

  const toggle = useCallback((key: string) => {
    setCompleted(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      try {
        localStorage.setItem(storageKey, JSON.stringify([...next]));
      } catch {}
      return next;
    });
  }, [storageKey]);

  return { completed, toggle };
}

function ExerciseRow({
  exercise,
  isWarmup,
  isCompleted,
  onToggle,
}: {
  exercise: Exercise;
  isWarmup?: boolean;
  isCompleted: boolean;
  onToggle: () => void;
}) {
  const [open, setOpen] = useState(false);

  const searchQuery = encodeURIComponent(`${exercise.name} how to proper form`);
  const embedUrl = `https://www.youtube.com/embed?listType=search&list=${searchQuery}`;
  const searchUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;

  const detail = exercise.sets && exercise.reps
    ? `${exercise.sets}×${exercise.reps}`
    : exercise.reps || exercise.duration || '';

  return (
    <div className="border-b border-white/5 last:border-0 pb-2 last:pb-0">
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={onToggle}
          className={`shrink-0 w-5 h-5 rounded-full border transition-all duration-150 flex items-center justify-center
            ${isCompleted
              ? 'bg-emerald-500 border-emerald-500'
              : 'border-neutral-600 hover:border-neutral-400'
            }`}
        >
          {isCompleted && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>

        <button
          onClick={() => setOpen(!open)}
          className="flex-1 flex items-center justify-between gap-4 group text-left"
        >
          <span className={`text-sm transition-colors ${
            isCompleted
              ? 'line-through text-neutral-500'
              : 'text-neutral-200 group-hover:text-white'
          }`}>
            {exercise.name}
          </span>
          <div className="flex items-center gap-2 shrink-0">
            {detail && (
              <span className={`text-xs text-right ${isCompleted ? 'text-neutral-600' : 'text-neutral-400'}`}>
                {detail}
              </span>
            )}
            <span className={`text-xs transition-colors ${open ? 'text-yellow-400' : 'text-neutral-600 group-hover:text-neutral-400'}`}>
              ▶
            </span>
          </div>
        </button>
      </div>

      {(exercise.startWeight || exercise.progression) && !isWarmup && (
        <div className="ml-8 mt-1.5 space-y-1">
          {exercise.startWeight && (
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-neutral-500">Start</span>
              <span className={`text-xs font-medium ${isCompleted ? 'text-neutral-600' : 'text-emerald-400'}`}>
                {exercise.startWeight}
              </span>
            </div>
          )}
          {exercise.progression && (
            <div className="flex items-start gap-1.5">
              <span className="text-xs text-neutral-500 shrink-0">Progress</span>
              <span className="text-xs text-neutral-400">{exercise.progression}</span>
            </div>
          )}
        </div>
      )}

      {open && (
        <div className="mt-2 ml-8 rounded-lg overflow-hidden border border-white/10 bg-black">
          <iframe
            src={embedUrl}
            className="w-full aspect-video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={exercise.name}
          />
          <div className="px-3 py-2 flex justify-end">
            <a
              href={searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-500 hover:text-white transition-colors"
            >
              Open in YouTube ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function BlockCard({
  block,
  blockIndex,
  completed,
  onToggle,
}: {
  block: Block;
  blockIndex: number;
  completed: Set<string>;
  onToggle: (key: string) => void;
}) {
  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-bold text-neutral-400 tracking-widest">
          {blockTypeLabel[block.type]}
        </span>
        <span className="text-xs text-neutral-500">·</span>
        <span className="text-sm font-semibold text-white">{block.label}</span>
      </div>

      {block.rounds && block.type !== 'finisher' && (
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-xs bg-white/10 text-neutral-300 px-2 py-0.5 rounded-full">
            {block.rounds} rounds
          </span>
          {block.workInterval && (
            <span className="text-xs bg-white/10 text-neutral-300 px-2 py-0.5 rounded-full">
              {block.workInterval}
            </span>
          )}
          {block.restInterval && (
            <span className="text-xs bg-white/10 text-neutral-300 px-2 py-0.5 rounded-full">
              {block.restInterval}
            </span>
          )}
          {block.restBetweenRounds && (
            <span className="text-xs bg-white/10 text-neutral-300 px-2 py-0.5 rounded-full">
              {block.restBetweenRounds}
            </span>
          )}
        </div>
      )}

      <div className="space-y-1">
        {block.exercises.map((ex, i) => {
          const key = `block-${blockIndex}-${i}`;
          return (
            <ExerciseRow
              key={i}
              exercise={ex}
              isCompleted={completed.has(key)}
              onToggle={() => onToggle(key)}
            />
          );
        })}
      </div>

      {block.notes && (
        <p className="mt-3 text-xs text-neutral-500 italic border-t border-white/5 pt-3">
          {block.notes}
        </p>
      )}
    </div>
  );
}

export default function WorkoutModal({ workout, onClose }: WorkoutModalProps) {
  const [warmupOpen, setWarmupOpen] = useState(false);
  const { completed, toggle } = useWorkoutCompletion(workout.day);
  const color = typeColors[workout.type];

  const totalMain = workout.blocks.reduce((acc, b) => acc + b.exercises.length, 0);
  const completedMain = [...completed].filter(k => k.startsWith('block-')).length;
  const allDone = totalMain > 0 && completedMain === totalMain;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="relative z-10 w-full sm:max-w-lg bg-[#161616] border border-white/10 rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#161616] border-b border-white/10 px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-neutral-500 font-bold tracking-widest">{workout.day.toUpperCase()}</p>
              <h2 className={`text-lg font-bold ${color}`}>{workout.label}</h2>
            </div>
            <div className="flex items-center gap-3">
              {totalMain > 0 && (
                <span className={`text-sm font-semibold tabular-nums ${allDone ? 'text-emerald-400' : 'text-neutral-500'}`}>
                  {completedMain}/{totalMain}
                </span>
              )}
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-white transition-colors text-xl leading-none p-1"
              >
                ✕
              </button>
            </div>
          </div>

          {totalMain > 0 && (
            <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${allDone ? 'bg-emerald-400' : 'bg-white/30'}`}
                style={{ width: `${(completedMain / totalMain) * 100}%` }}
              />
            </div>
          )}
        </div>

        <div className="p-5 space-y-4">
          {/* Warmup */}
          <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
            <button
              onClick={() => setWarmupOpen(!warmupOpen)}
              className="w-full flex items-center justify-between px-4 py-3 text-left"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-neutral-400 tracking-widest">WARM-UP</span>
                <span className="text-sm font-semibold text-white">Mobility — 15 min</span>
              </div>
              <span className="text-neutral-400 text-sm">{warmupOpen ? '▲' : '▼'}</span>
            </button>

            {warmupOpen && (
              <div className="px-4 pb-4 border-t border-white/10 pt-3 space-y-1">
                {workout.warmup.map((ex, i) => (
                  <ExerciseRow
                    key={i}
                    exercise={ex}
                    isWarmup
                    isCompleted={completed.has(`warmup-${i}`)}
                    onToggle={() => toggle(`warmup-${i}`)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Main blocks */}
          <div>
            <p className="text-xs font-bold text-neutral-400 tracking-widest mb-3">
              MAIN — {workout.totalMinutes - 15} MIN
            </p>
            <div className="space-y-3">
              {workout.blocks.map((block, i) => (
                <BlockCard
                  key={i}
                  block={block}
                  blockIndex={i}
                  completed={completed}
                  onToggle={toggle}
                />
              ))}
            </div>
          </div>

          <p className="text-xs text-neutral-600 text-center pt-1">
            Tap any exercise to see how it's done
          </p>
        </div>
      </div>
    </div>
  );
}
