import { TWorkout } from "@/types/workouts";
import { storage } from "./storage";

export const getWorkouts = (): TWorkout[] => {
  const workoutsAsJson = storage.getString("workouts");
  const workouts = workoutsAsJson ? JSON.parse(workoutsAsJson) : [];

  return workouts;
};

export const saveWorkouts = (workouts: TWorkout[]) => {
  storage.set("workouts", JSON.stringify(workouts));
};
