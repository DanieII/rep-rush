import { TExercise } from "@/types/exercises";
import { View, Text } from "react-native";

type ExerciseProps = {
  exercise: TExercise;
};

export default function Exercise({ exercise }: ExerciseProps) {
  return (
    <View>
      <Text>{exercise.title}</Text>
    </View>
  );
}
