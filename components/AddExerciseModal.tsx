import {
  Modal,
  TextInput,
  StyleSheet,
  View,
  SafeAreaView,
  Button,
  Pressable,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useState } from "react";

type AddExerciseModalProps = {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  addExercise: (exerciseTitle: string) => void;
};

export default function AddExerciseModal({
  modalVisible,
  setModalVisible,
  addExercise,
}: AddExerciseModalProps) {
  const [exerciseTitle, setExerciseTitle] = useState("");

  const handleAddExercise = () => {
    if (!exerciseTitle.trim()) return;

    addExercise(exerciseTitle);
    setExerciseTitle("");
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Pressable
            style={styles.closeBtn}
            onPress={() => setModalVisible(false)}
          >
            <FontAwesome6 name="xmark" size={24} color="black" />
          </Pressable>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Title"
              autoCapitalize="words"
              value={exerciseTitle}
              onChangeText={setExerciseTitle}
            />
            <Button title="Add Exercise" onPress={handleAddExercise} />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: { flex: 1 },
  modalContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  closeBtn: {
    alignSelf: "flex-start",
  },
  form: {
    width: "100%",
    marginBlock: "auto",
    gap: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});
