import { getWorkouts, saveWorkouts } from "@/lib/workouts";
import { TExercise } from "@/types/exercises";
import { TWorkout } from "@/types/workouts";
import { randomUUID } from "expo-crypto";
import { useEffect, useState } from "react";

export function useWorkouts() {
  const [workouts, setWorkouts] = useState<TWorkout[]>([]);

  useEffect(() => {
    const workouts = getWorkouts();

    if (workouts) {
      setWorkouts(workouts);
    }
  }, []);

  const addWorkout = (
    workoutTitle: string,
    exercises: TExercise[],
    exercise_duration: number,
    rest_duration: number,
  ) => {
    const workoutId = randomUUID();
    const workout: TWorkout = {
      id: workoutId,
      title: workoutTitle,
      exercises,
      exercise_duration,
      rest_duration,
    };
    const updatedWorkouts = [...workouts, workout];

    setWorkouts((prevWorkouts) => [...prevWorkouts, workout]);
    saveWorkouts(updatedWorkouts);
  };

  const removeWorkout = (workoutId: string) => {
    const updatedWorkouts = workouts.filter(
      (workout) => workout.id !== workoutId,
    );

    setWorkouts(updatedWorkouts);
    saveWorkouts(updatedWorkouts);
  };

  return { workouts, addWorkout, removeWorkout };
}
