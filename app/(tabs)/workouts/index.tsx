import CustomButton from "@/components/CustomButton";
import Workout from "@/components/Workout";
import { useWorkoutStore } from "@/store/workoutStore";
import { useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";

export default function Workouts() {
  const { workouts, loadWorkouts, removeWorkout } = useWorkoutStore();

  useEffect(() => {
    loadWorkouts();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.workouts}
        data={workouts}
        renderItem={({ item }) => (
          <Workout workout={item} removeWorkout={removeWorkout} />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No workouts available</Text>
        }
      ></FlatList>
      <CustomButton title="Add Workout" link="/(tabs)/workouts/add" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
    padding: 30,
  },
  workouts: {
    gap: 20,
  },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
  },
});
