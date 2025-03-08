import AddExerciseModal from "@/components/AddExerciseModal";
import Exercise from "@/components/Exercise";
import { useExercises } from "@/hooks/useExercises";
import { useState } from "react";
import { View, Button, StyleSheet } from "react-native";

export default function Exercises() {
  const { exercises, addExercise } = useExercises();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {exercises.map((exercise) => (
        <Exercise key={exercise.id} exercise={exercise} />
      ))}
      <AddExerciseModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        addExercise={addExercise}
      />
      <Button onPress={() => setModalVisible(true)} title="Add Exercise" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 30,
    gap: 10,
  },
});
