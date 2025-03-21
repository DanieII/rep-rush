import { create } from "zustand";
import { getWorkouts, saveWorkouts } from "@/lib/workouts";
import { TWorkout } from "@/types/workouts";
import { TExercise } from "@/types/exercises";
import { randomUUID } from "expo-crypto";

type WorkoutStore = {
  workouts: TWorkout[];
  loadWorkouts: () => void;
  addWorkout: (
    workoutTitle: string,
    exercises: TExercise[],
    exerciseDuration: number,
    restDuration: number,
  ) => void;
  removeWorkout: (workoutId: string) => void;
};

export const useWorkoutStore = create<WorkoutStore>((set) => ({
  workouts: [],

  loadWorkouts: () => {
    const workouts = getWorkouts();

    set({ workouts });
  },

  addWorkout: (
    workoutTitle: string,
    exercises: TExercise[],
    exerciseDuration: number,
    restDuration: number,
  ) => {
    const workoutId = randomUUID();
    const newWorkout: TWorkout = {
      id: workoutId,
      title: workoutTitle,
      exercises,
      exerciseDuration,
      restDuration,
    };

    set((state) => {
      const updatedWorkouts = [...state.workouts, newWorkout];

      saveWorkouts(updatedWorkouts);

      return { workouts: updatedWorkouts };
    });
  },

  removeWorkout: (workoutId: string) => {
    set((state) => {
      const updatedWorkouts = state.workouts.filter(
        (workout) => workout.id !== workoutId,
      );

      saveWorkouts(updatedWorkouts);

      return { workouts: updatedWorkouts };
    });
  },
}));
