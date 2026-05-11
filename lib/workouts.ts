import { DayWorkout } from './types';

const standardWarmup = [
  { name: 'Light row or assault bike', duration: '3 min' },
  { name: 'Ankle circles', reps: '10 each direction' },
  { name: 'Hip circles', reps: '10 each direction' },
  { name: 'Cat-cow', reps: '10 reps' },
  { name: 'Arm circles', reps: '10 each direction' },
  { name: "World's greatest stretch", reps: '5 reps/side' },
  { name: 'Glute bridges', sets: 2, reps: '15 reps' },
  { name: 'Hip 90/90 stretch', reps: '5 reps/side' },
];

export const weekWorkouts: DayWorkout[] = [
  {
    day: 'Monday',
    shortDay: 'MON',
    type: 'strength',
    label: 'Full Body S&C',
    totalMinutes: 70,
    warmup: standardWarmup,
    blocks: [
      {
        label: 'Superset A',
        type: 'superset',
        rounds: 4,
        restBetweenRounds: '90s rest',
        exercises: [
          {
            name: 'DB Goblet Squat',
            sets: 4,
            reps: '10 reps',
            startWeight: '8kg DB',
            progression: '+2kg once all 4×10 are clean for 2 sessions',
          },
          {
            name: 'Cable Row',
            sets: 4,
            reps: '10 reps',
            startWeight: '15kg',
            progression: '+5kg once all 4×10 are clean for 2 sessions',
          },
        ],
      },
      {
        label: 'Superset B',
        type: 'superset',
        rounds: 4,
        restBetweenRounds: '90s rest',
        exercises: [
          {
            name: 'Romanian Deadlift',
            sets: 4,
            reps: '10 reps',
            startWeight: 'Just the bar (20kg) — form first',
            progression: '+5kg once form is solid and all 4×10 feel controlled',
          },
          {
            name: 'Push-up',
            sets: 4,
            reps: '12 reps',
            startWeight: 'Bodyweight',
            progression: 'Master 4×12 → progress to archer push-up',
          },
        ],
      },
      {
        label: 'Superset C',
        type: 'superset',
        rounds: 3,
        restBetweenRounds: '60s rest',
        exercises: [
          {
            name: 'DB Deadlift',
            sets: 3,
            reps: '10 reps',
            startWeight: '10kg DB each hand',
            progression: '+2kg per DB once all 3×10 are clean for 2 sessions',
          },
          {
            name: 'Glute Bridge Hold',
            sets: 3,
            reps: '20s hold',
            startWeight: 'Bodyweight',
            progression: 'Master 3×20s → add barbell across hips (start 10kg)',
          },
        ],
      },
      {
        label: 'Finisher',
        type: 'finisher',
        exercises: [
          {
            name: 'Rowing machine',
            duration: '5 min moderate pace',
            startWeight: 'Drag factor 110–120',
            progression: 'Hold pace, don\'t increase intensity — this is recovery work',
          },
        ],
      },
    ],
  },
  {
    day: 'Tuesday',
    shortDay: 'TUE',
    type: 'hiit',
    label: 'Metabolic Circuit',
    totalMinutes: 70,
    warmup: standardWarmup,
    blocks: [
      {
        label: 'Circuit A',
        type: 'circuit',
        rounds: 4,
        workInterval: '40s on',
        restInterval: '20s off',
        restBetweenRounds: '90s rest between rounds',
        exercises: [
          {
            name: 'Battle rope slams',
            startWeight: 'Bodyweight (rope only)',
            progression: 'Focus on max power per slam — speed before duration',
          },
          {
            name: 'Box step-ups (alternating)',
            startWeight: 'Bodyweight',
            progression: 'Master bodyweight → hold 6kg DBs in each hand',
          },
          {
            name: 'Cable Pull-Through (light — focus on hip hinge)',
            startWeight: '10kg cable stack',
            progression: '+5kg once hip hinge pattern feels automatic',
          },
          {
            name: 'Push-up',
            startWeight: 'Bodyweight',
            progression: 'Master 40s unbroken → progress to archer push-up',
          },
          {
            name: 'Mountain climbers',
            startWeight: 'Bodyweight',
            progression: 'Focus on keeping hips level — speed comes later',
          },
        ],
      },
      {
        label: 'Circuit B',
        type: 'circuit',
        rounds: 3,
        restBetweenRounds: '60s rest between rounds',
        exercises: [
          {
            name: 'Row 300m',
            reps: 'hard pace',
            startWeight: 'Drag factor 110–120',
            progression: 'Track your 300m time — beat it by 1–2s every 2 weeks',
          },
          {
            name: 'DB Goblet Squat',
            reps: '12 reps',
            startWeight: '8kg DB',
            progression: '+2kg when 3×12 feels easy',
          },
          {
            name: 'Band pull-apart',
            reps: '15 reps',
            startWeight: 'Light resistance band',
            progression: '→ Medium band once 15 reps feel easy',
          },
        ],
      },
    ],
  },
  {
    day: 'Wednesday',
    shortDay: 'WED',
    type: 'strength',
    label: 'Upper + Core S&C',
    totalMinutes: 70,
    warmup: standardWarmup,
    blocks: [
      {
        label: 'Superset A',
        type: 'superset',
        rounds: 4,
        restBetweenRounds: '90s rest',
        exercises: [
          {
            name: 'Lat Pulldown',
            sets: 4,
            reps: '10 reps',
            startWeight: '20kg',
            progression: '+5kg once all 4×10 are clean for 2 sessions',
          },
          {
            name: 'DB Bench Press',
            sets: 4,
            reps: '10 reps',
            startWeight: '8kg each DB',
            progression: '+2kg per DB once all 4×10 are clean for 2 sessions',
          },
        ],
      },
      {
        label: 'Superset B',
        type: 'superset',
        rounds: 3,
        restBetweenRounds: '90s rest',
        exercises: [
          {
            name: 'Seated Cable Row',
            sets: 3,
            reps: '12 reps',
            startWeight: '15kg',
            progression: '+5kg once all 3×12 are clean for 2 sessions',
          },
          {
            name: 'DB Shoulder Press',
            sets: 3,
            reps: '10 reps',
            startWeight: '6kg each DB',
            progression: '+2kg per DB once all 3×10 are clean for 2 sessions',
          },
        ],
      },
      {
        label: 'Superset C',
        type: 'superset',
        rounds: 3,
        restBetweenRounds: '60s rest',
        exercises: [
          {
            name: 'Band Face Pull',
            sets: 3,
            reps: '15 reps',
            startWeight: 'Light resistance band',
            progression: '→ Medium band once 15 reps feel controlled',
          },
          {
            name: 'Tricep Pushdown',
            sets: 3,
            reps: '12 reps',
            startWeight: '10kg',
            progression: '+5kg once all 3×12 are clean for 2 sessions',
          },
        ],
      },
      {
        label: 'Core — 3 rounds',
        type: 'circuit',
        rounds: 3,
        restBetweenRounds: '45s rest',
        exercises: [
          {
            name: 'Glute Bridge Hold',
            reps: '20s hold',
            startWeight: 'Bodyweight',
            progression: 'Master 3×20s → add barbell across hips (start 10kg)',
          },
          {
            name: 'Russian Twist',
            reps: '15 reps',
            startWeight: 'Bodyweight',
            progression: 'Master 3×15 → hold a 4kg plate',
          },
        ],
      },
    ],
  },
  {
    day: 'Thursday',
    shortDay: 'THU',
    type: 'hiit',
    label: 'Conditioning',
    totalMinutes: 70,
    warmup: standardWarmup,
    blocks: [
      {
        label: 'Intervals — Block A',
        type: 'interval',
        rounds: 6,
        workInterval: '2 min hard',
        restInterval: '1 min easy',
        exercises: [
          {
            name: 'Rowing machine or assault bike',
            startWeight: 'Drag factor 110–120',
            progression: 'Track distance covered in 2 min — aim to increase by 10–15m every 2 weeks',
          },
        ],
        notes: "Hard = RPE 8/10. Easy = keep moving, don't stop.",
      },
      {
        label: 'Block B — woven into last 3 rest periods',
        type: 'circuit',
        rounds: 3,
        exercises: [
          {
            name: 'DB Bent-over Row',
            reps: '10 reps each side',
            startWeight: '8kg DB',
            progression: '+2kg once all 3×10 each side feel controlled',
          },
          {
            name: 'Cable Pull-Through',
            reps: '12 reps',
            startWeight: '10kg cable stack',
            progression: '+5kg once hip hinge is automatic and all 12 are powerful',
          },
          {
            name: 'Glute Bridge Hold',
            reps: '20s hold',
            startWeight: 'Bodyweight',
            progression: 'Master 3×20s → add barbell across hips (start 10kg)',
          },
        ],
        notes: 'Do this during the 1 min rest of rounds 4, 5, 6.',
      },
    ],
  },
  {
    day: 'Friday',
    shortDay: 'FRI',
    type: 'strength',
    label: 'Lower + Posterior Chain',
    totalMinutes: 70,
    warmup: standardWarmup,
    blocks: [
      {
        label: 'Superset A',
        type: 'superset',
        rounds: 4,
        restBetweenRounds: '90s rest',
        exercises: [
          {
            name: 'Back Squat',
            sets: 4,
            reps: '8 reps',
            startWeight: 'Just the bar (20kg) — get the pattern right first',
            progression: '+5kg once all 4×8 are clean for 2 sessions',
          },
          {
            name: 'Leg Curl',
            sets: 4,
            reps: '10 reps',
            startWeight: '15kg',
            progression: '+5kg once all 4×10 are clean for 2 sessions',
          },
        ],
      },
      {
        label: 'Superset B',
        type: 'superset',
        rounds: 4,
        restBetweenRounds: '90s rest',
        exercises: [
          {
            name: 'Hip Thrust',
            sets: 4,
            reps: '12 reps',
            startWeight: 'Bodyweight first session → just the bar (20kg) next',
            progression: '+5kg once all 4×12 are clean for 2 sessions',
          },
          {
            name: 'Romanian Deadlift',
            sets: 3,
            reps: '10 reps',
            startWeight: 'Just the bar (20kg) — same as Monday, form first',
            progression: '+5kg once form is solid and all 3×10 feel controlled',
          },
        ],
      },
      {
        label: 'Superset C',
        type: 'superset',
        rounds: 3,
        restBetweenRounds: '60s rest',
        exercises: [
          {
            name: 'Leg Press',
            sets: 3,
            reps: '12 reps',
            startWeight: '30kg',
            progression: '+10kg once all 3×12 are clean for 2 sessions',
          },
          {
            name: 'Calf Raise',
            sets: 3,
            reps: '15 reps',
            startWeight: '20kg',
            progression: '+5kg once all 3×15 are clean for 2 sessions',
          },
        ],
      },
      {
        label: 'Finisher',
        type: 'finisher',
        exercises: [
          {
            name: 'Band walks',
            sets: 3,
            reps: '15 reps each direction',
            startWeight: 'Light resistance band',
            progression: '→ Medium band once 3×15 each direction feels easy',
          },
          {
            name: 'Glute Bridge Hold',
            sets: 3,
            reps: '30s hold',
            startWeight: 'Bodyweight',
            progression: 'Master 3×30s → add barbell across hips (start 10kg)',
          },
        ],
      },
    ],
  },
  {
    day: 'Saturday',
    shortDay: 'SAT',
    type: 'cycling',
    label: 'Zone 2 Cycling',
    totalMinutes: 0,
    warmup: [],
    blocks: [],
  },
  {
    day: 'Sunday',
    shortDay: 'SUN',
    type: 'cycling',
    label: 'Zone 2 Cycling',
    totalMinutes: 0,
    warmup: [],
    blocks: [],
  },
];

export const getDayWorkout = (dayIndex: number): DayWorkout => {
  return weekWorkouts[dayIndex];
};
