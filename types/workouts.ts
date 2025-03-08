import { TExercise } from "./exercises";

export type TWorkout = {
  id: string;
  title: string;
  exercises: TExercise[];
  exercise_duration: number;
  rest_duration: number;
};
