import { TExercise } from "@/types/exercises";
import { FontAwesome6 } from "@expo/vector-icons";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Toast from "react-native-toast-message";

type ExerciseProps = {
  exercise: TExercise;
  removeExercise: (exerciseId: string) => void;
};

export default function Exercise({ exercise, removeExercise }: ExerciseProps) {
  const onRemoveBtnPress = (exerciseId: string) => {
    try {
      removeExercise(exerciseId);
    } catch (error) {
      if (error instanceof Error) {
        Toast.show({
          type: "error",
          text1: error.message,
          topOffset: 60,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Could not remove exercise",
          topOffset: 60,
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{exercise.title}</Text>
        <Pressable onPress={() => onRemoveBtnPress(exercise.id)}>
          <FontAwesome6 name="xmark" size={24} color="red" />
        </Pressable>
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
  },
});
