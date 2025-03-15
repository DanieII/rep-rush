import { TWorkout } from "@/types/workouts";
import { Platform } from "react-native";

export const calculateWorkoutDuration = (workout: TWorkout) => {
  const { exerciseDuration, restDuration, exercises } = workout;

  // Calculate total exercise and rest durations in seconds
  const allExerciseDuration = exerciseDuration * exercises.length;
  const allRestDuration = restDuration * (exercises.length - 1);
  const workoutDuration = allExerciseDuration + allRestDuration;

  // Calculate minutes and remaining seconds
  const workoutMinutes = Math.floor(workoutDuration / 60);
  const workoutExtraSeconds = workoutDuration % 60;

  return `${workoutMinutes}m ${workoutExtraSeconds}s`;
};

export const getPrimaryColor = () => {
  if (Platform.OS === "ios") {
    return "#007AFF";
  }
  return "#2196F3";
};
