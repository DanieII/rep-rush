import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { TExercise } from "@/types/exercises";

type WorkoutHeadingProps = {
  phase: "exercise" | "rest";
  exercises: TExercise[];
  exerciseIndex: number;
};

export default function WorkoutHeading({
  phase,
  exercises,
  exerciseIndex,
}: WorkoutHeadingProps) {
  const currentExercise = exercises[exerciseIndex].title;

  return (
    <View>
      <Text style={styles.heading}>
        {phase === "exercise" ? currentExercise : `Next: ${currentExercise}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
  },
});
