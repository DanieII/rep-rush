import { addExercise, getExercises, removeExercise } from "@/lib/exercises";
import { TExercise } from "@/types/exercises";
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
    const newExercises = addExercise(exerciseTitle);

    set({ exercises: newExercises });
  },

  removeExercise: (exerciseId) => {
    const newExercises = removeExercise(exerciseId);

    set({ exercises: newExercises });
  },
}));
