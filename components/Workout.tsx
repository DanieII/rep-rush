import { TWorkout } from "@/types/workouts";
import { View, Text } from "react-native";

type WorkoutProps = {
  workout: TWorkout;
};

export default function Workout({ workout }: WorkoutProps) {
  return (
    <View>
      <Text>{workout.title}</Text>
    </View>
  );
}
