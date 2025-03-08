import { getExercises, saveExercises } from "@/lib/exercises";
import { TExercise } from "@/types/exercises";
import { randomUUID } from "expo-crypto";
import { useEffect, useState } from "react";

export function useExercises() {
  const [exercises, setExercises] = useState<TExercise[]>([]);

  useEffect(() => {
    const exercises = getExercises();

    if (exercises) {
      setExercises(exercises);
    }
  }, []);

  const addExercise = (exerciseTitle: string) => {
    const exerciseId = randomUUID();
    const exercise: TExercise = { id: exerciseId, title: exerciseTitle };
    const updatedExercises = [...exercises, exercise];

    setExercises((prevExercises) => [...prevExercises, exercise]);
    saveExercises(updatedExercises);
  };

  const removeExercise = (exerciseId: string) => {
    const updatedExercises = exercises.filter(
      (exercise) => exercise.id !== exerciseId,
    );

    setExercises(updatedExercises);
    saveExercises(updatedExercises);
  };

  return { exercises, addExercise, removeExercise };
}
