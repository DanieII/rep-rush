import { TExercise } from "./exercises";

export type TWorkout = {
  id: string;
  title: string;
  exercises: TExercise[];
  exerciseDuration: number;
  restDuration: number;
};
