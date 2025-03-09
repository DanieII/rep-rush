import { getWorkouts } from "./workouts";

export const validateExercise = (exerciseId: string) => {
  // Checks if the exercise is used in any workout
  const workouts = getWorkouts();

  for (const workout of workouts) {
    const exerciseIds = workout.exercises.map((exercise) => exercise.id);

    if (exerciseIds.includes(exerciseId)) {
      return false;
    }
  }

  return true;
};
