export type WorkoutType = 'strength' | 'hiit' | 'cycling';

export interface Exercise {
  name: string;
  sets?: number;
  reps?: string;
  duration?: string;
  startWeight?: string;
  progression?: string;
}

export interface Block {
  label: string;
  type: 'superset' | 'circuit' | 'interval' | 'finisher';
  rounds?: number;
  workInterval?: string;
  restInterval?: string;
  restBetweenRounds?: string;
  exercises: Exercise[];
  notes?: string;
}

export interface DayWorkout {
  day: string;
  shortDay: string;
  type: WorkoutType;
  label: string;
  totalMinutes: number;
  warmup: Exercise[];
  blocks: Block[];
}
