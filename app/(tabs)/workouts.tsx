import AddWorkout from "@/components/AddWorkout";
import Workout from "@/components/Workout";
import { useWorkoutStore } from "@/store/workoutStore";
import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Button } from "react-native";

export default function Workouts() {
  const { workouts, loadWorkouts, addWorkout } = useWorkoutStore();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadWorkouts();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.workouts}
        data={workouts}
        renderItem={({ item }) => <Workout workout={item} />}
        keyExtractor={(item) => item.id}
      ></FlatList>
      <Button onPress={() => setModalVisible(true)} title="Add Workout" />
      <AddWorkout
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        addWorkout={addWorkout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
    padding: 30,
  },
  workouts: {},
});
