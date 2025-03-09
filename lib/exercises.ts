import { TExercise } from "@/types/exercises";
import { storage } from "./storage";
import { randomUUID } from "expo-crypto";
import { validateExercise } from "./validators";

export const getExercises = (): TExercise[] => {
  const exercisesAsJson = storage.getString("exercises");
  const exercises = exercisesAsJson ? JSON.parse(exercisesAsJson) : [];

  return exercises;
};

export const saveExercises = (exercises: TExercise[]) => {
  storage.set("exercises", JSON.stringify(exercises));
};

export const addExercise = (exerciseTitle: string) => {
  const exercises = getExercises();
  const newExerciseId = randomUUID();
  const newExercise: TExercise = { id: newExerciseId, title: exerciseTitle };
  const newExercises = [...exercises, newExercise];
  saveExercises(newExercises);

  return newExercises;
};

export const removeExercise = (exerciseId: string) => {
  const isExerciseValid = validateExercise(exerciseId);
  if (!isExerciseValid) throw new Error("Exercise is used in a workout");

  const exercises = getExercises();
  const updatedExercises = exercises.filter(
    (exercise) => exercise.id !== exerciseId,
  );
  saveExercises(updatedExercises);

  return updatedExercises;
};
