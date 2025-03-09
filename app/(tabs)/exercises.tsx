import AddExercise from "@/components/AddExercise";
import Exercise from "@/components/Exercise";
import { useExerciseStore } from "@/store/exerciseStore";
import { useEffect, useState } from "react";
import { View, Button, StyleSheet, FlatList, Text } from "react-native";

export default function Exercises() {
  const { exercises, loadExercises, addExercise, removeExercise } =
    useExerciseStore();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadExercises();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.exercises}
        data={exercises}
        renderItem={({ item }) => (
          <Exercise exercise={item} removeExercise={removeExercise} />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No exercises available</Text>
        }
      />
      <Button onPress={() => setModalVisible(true)} title="Add Exercise" />
      <AddExercise
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        addExercise={addExercise}
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
  exercises: {
    gap: 20,
  },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
  },
});
