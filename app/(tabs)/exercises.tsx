import AddExerciseModal from "@/components/AddExerciseModal";
import Exercise from "@/components/Exercise";
import { useExercises } from "@/hooks/useExercises";
import { useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import { ScrollView } from "react-native";

export default function Exercises() {
  const { exercises, addExercise, removeExercise } = useExercises();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.exercises}>
          {exercises.map((exercise) => (
            <Exercise
              key={exercise.id}
              exercise={exercise}
              removeExercise={removeExercise}
            />
          ))}
        </View>
      </ScrollView>
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
    gap: 20,
    padding: 30,
  },
  exercises: {
    flex: 1,
    gap: 15,
  },
});
