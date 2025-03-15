import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { TExercise } from "@/types/exercises";
import { getPrimaryColor } from "@/lib/utils";

type ExerciseToggleProps = {
  exercise: TExercise;
  isSelected: boolean;
  setSelectedExercises: React.Dispatch<React.SetStateAction<TExercise[]>>;
  setSelectedExercisesError: React.Dispatch<React.SetStateAction<string>>;
};

export default function ExerciseToggle({
  exercise,
  isSelected,
  setSelectedExercises,
  setSelectedExercisesError,
}: ExerciseToggleProps) {
  const toggleExercise = (exercise: TExercise, isSelected: boolean) => {
    setSelectedExercises((prev) => {
      // Remove the exercise if it is already selected
      if (isSelected) {
        return prev.filter(
          (currentExercise) => currentExercise.id !== exercise.id,
        );
      }

      // Otherwise add the exercise and reset exercises error message
      setSelectedExercisesError("");
      return [...prev, exercise];
    });
  };

  return (
    <Pressable
      style={[styles.exercise, isSelected && styles.selectedExercise]}
      onPress={() => toggleExercise(exercise, isSelected)}
    >
      <Text style={isSelected && styles.selectedExerciseText}>
        {exercise.title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  exercise: {
    borderWidth: 2,
    paddingInline: 20,
    paddingBlock: 15,
    borderRadius: 5,
  },
  selectedExercise: {
    borderColor: getPrimaryColor(),
  },
  selectedExerciseText: {
    color: getPrimaryColor(),
  },
});
