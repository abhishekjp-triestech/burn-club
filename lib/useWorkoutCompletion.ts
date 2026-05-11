'use client';

import { useCallback, useEffect, useState } from 'react';

function getWeekKey(day: string): string {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const monday = new Date(now);
  monday.setDate(diff);
  const weekStart = monday.toISOString().slice(0, 10);
  return `burn-club-week-${weekStart}-${day}`;
}

export function useWorkoutCompletion(day: string) {
  const storageKey = getWeekKey(day);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) setCompleted(new Set(JSON.parse(stored) as string[]));
    } catch {}
  }, [storageKey]);

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
