'use client';

import { useEffect, useState } from 'react';
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

function ExerciseRow({ exercise, isWarmup }: { exercise: Exercise; isWarmup?: boolean }) {
  const [open, setOpen] = useState(false);

  const searchQuery = encodeURIComponent(`${exercise.name} how to proper form`);
  const embedUrl = `https://www.youtube.com/embed?listType=search&list=${searchQuery}`;
  const searchUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;

  const detail = exercise.sets && exercise.reps
    ? `${exercise.sets}×${exercise.reps}`
    : exercise.reps || exercise.duration || '';

  return (
    <div className="border-b border-white/5 last:border-0 pb-2 last:pb-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 pt-2 group text-left"
      >
        <div className="flex items-center gap-2">
          <span className={`text-xs transition-colors ${open ? 'text-yellow-400' : 'text-neutral-600 group-hover:text-neutral-400'}`}>
            ▶
          </span>
          <span className="text-sm text-neutral-200 group-hover:text-white transition-colors">
            {exercise.name}
          </span>
        </div>
        {detail && (
          <span className="text-xs text-neutral-400 text-right shrink-0">{detail}</span>
        )}
      </button>

      {/* Weight info — always visible if present */}
      {(exercise.startWeight || exercise.progression) && !isWarmup && (
        <div className="ml-4 mt-1.5 space-y-1">
          {exercise.startWeight && (
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-neutral-500">Start</span>
              <span className="text-xs font-medium text-emerald-400">{exercise.startWeight}</span>
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
        <div className="mt-2 rounded-lg overflow-hidden border border-white/10 bg-black">
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

function BlockCard({ block }: { block: Block }) {
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
        {block.exercises.map((ex, i) => (
          <ExerciseRow key={i} exercise={ex} />
        ))}
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
  const color = typeColors[workout.type];

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
        <div className="sticky top-0 bg-[#161616] border-b border-white/10 px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-neutral-500 font-bold tracking-widest">{workout.day.toUpperCase()}</p>
            <h2 className={`text-lg font-bold ${color}`}>{workout.label}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors text-xl leading-none p-1"
          >
            ✕
          </button>
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
                  <ExerciseRow key={i} exercise={ex} isWarmup />
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
                <BlockCard key={i} block={block} />
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
