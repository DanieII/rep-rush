import AddExercise from "@/components/AddExercise";
import Exercise from "@/components/Exercise";
import { useExercises } from "@/hooks/useExercises";
import { useState } from "react";
import { View, Button, StyleSheet, FlatList } from "react-native";

export default function Exercises() {
  const { exercises, addExercise, removeExercise } = useExercises();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.exercises}
        data={exercises}
        renderItem={({ item }) => (
          <Exercise exercise={item} removeExercise={removeExercise} />
        )}
        keyExtractor={(item) => item.id}
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
});
