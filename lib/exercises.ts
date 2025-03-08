import { TExercise } from "@/types/exercises";
import { storage } from "./storage";

export const getExercises = (): TExercise[] => {
  const exercisesAsJson = storage.getString("exercises");
  const exercises = exercisesAsJson ? JSON.parse(exercisesAsJson) : [];

  return exercises;
};

export const saveExercises = (exercises: TExercise[]) => {
  storage.set("exercises", JSON.stringify(exercises));
};
