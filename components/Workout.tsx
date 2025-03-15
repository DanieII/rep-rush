import { TWorkout } from "@/types/workouts";
import { FontAwesome6 } from "@expo/vector-icons";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { calculateWorkoutDuration, getPrimaryColor } from "@/lib/utils";
import { Link } from "expo-router";

type WorkoutProps = {
  workout: TWorkout;
  removeWorkout: (workoutId: string) => void;
};

export default function Workout({ workout, removeWorkout }: WorkoutProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.information}>
          <Text style={styles.title}>{workout.title}</Text>
          <Text>{calculateWorkoutDuration(workout)}</Text>
        </View>
        <View style={styles.actions}>
          <Pressable onPress={() => removeWorkout(workout.id)}>
            <FontAwesome6 name="xmark" size={24} color="red" />
          </Pressable>
          <Link
            href={{ pathname: "/workouts/[id]", params: { id: workout.id } }}
          >
            <FontAwesome6 name="play" size={24} color={getPrimaryColor()} />
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    paddingBlock: 20,
    paddingInline: 25,
    borderRadius: 5,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  information: {
    gap: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
    gap: 15,
  },
});
