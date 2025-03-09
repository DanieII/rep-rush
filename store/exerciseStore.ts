import { getExercises, saveExercises } from "@/lib/exercises";
import { TExercise } from "@/types/exercises";
import { randomUUID } from "expo-crypto";
import { create } from "zustand";

type ExerciseStore = {
  exercises: TExercise[];
  loadExercises: () => void;
  addExercise: (exerciseTitle: string) => void;
  removeExercise: (exerciseId: string) => void;
};

export const useExerciseStore = create<ExerciseStore>((set) => ({
  exercises: [],

  loadExercises: () => {
    const exercises = getExercises();

    set({ exercises });
  },

  addExercise: (exerciseTitle) => {
    const exerciseId = randomUUID();
    const newExercise: TExercise = { id: exerciseId, title: exerciseTitle };

    set((state) => {
      const updatedExercises = [...state.exercises, newExercise];

      saveExercises(updatedExercises);

      return { exercises: updatedExercises };
    });
  },

  removeExercise: (exerciseId) => {
    set((state) => {
      const updatedExercises = state.exercises.filter(
        (exercise) => exercise.id !== exerciseId,
      );

      saveExercises(updatedExercises);

      return { exercises: updatedExercises };
    });
  },
}));
