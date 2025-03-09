import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Button,
  FlatList,
  Pressable,
  Platform,
} from "react-native";
import CustomModal from "./CustomModal";
import { TExercise } from "@/types/exercises";
import { useExerciseStore } from "@/store/exerciseStore";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link } from "expo-router";

type AddWorkoutProps = {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  addWorkout: (
    workoutTitle: string,
    exercises: TExercise[],
    exerciseDuration: number,
    restDuration: number,
  ) => void;
};

type FormData = {
  title: string;
  exerciseDuration: string;
  restDuration: string;
};

export default function AddWorkout({
  modalVisible,
  setModalVisible,
  addWorkout,
}: AddWorkoutProps) {
  const { exercises, loadExercises } = useExerciseStore();
  const [selectedExercises, setSelectedExercises] = useState<TExercise[]>([]);
  const [selectedExercisesError, setSelectedExercisesError] = useState("");
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      exerciseDuration: "",
      restDuration: "",
    },
  });

  useEffect(() => {
    loadExercises();
  }, []);

  const onSubmit = (data: FormData) => {
    if (!selectedExercises.length) {
      setSelectedExercisesError("Select at least one exercise.");
      return;
    }

    const { title, exerciseDuration, restDuration } = data;
    addWorkout(
      title,
      selectedExercises,
      Number(exerciseDuration),
      Number(restDuration),
    );

    reset();
    setSelectedExercises([]);
    setSelectedExercisesError("");
    setModalVisible(false);
  };

  const toggleExercise = (exercise: TExercise, isSelected: boolean) => {
    setSelectedExercises((prev) => {
      // Remove the exercise if it is already selected
      if (isSelected) {
        return prev.filter(
          (currentExercise) => currentExercise.id !== exercise.id,
        );
      }

      // Otherwise add the exercise and reset exercises error message
      setSelectedExercisesError("");
      return [...prev, exercise];
    });
  };

  return (
    <CustomModal modalVisible={modalVisible} setModalVisible={setModalVisible}>
      <View style={styles.form}>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Title"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="title"
        />
        {errors.title && (
          <Text style={styles.errorMsg}>Title is required.</Text>
        )}

        <Controller
          control={control}
          rules={{ required: true, min: 1, pattern: /^[0-9]*$/ }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Exercise Duration (seconds)"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="exerciseDuration"
        />
        {errors.exerciseDuration && (
          <Text style={styles.errorMsg}>Enter a valid duration.</Text>
        )}

        <Controller
          control={control}
          rules={{ required: true, min: 1, pattern: /^[0-9]*$/ }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Rest Duration (seconds)"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="restDuration"
        />
        {errors.restDuration && (
          <Text style={styles.errorMsg}>Enter a valid rest duration.</Text>
        )}

        <View>
          <Text style={styles.exercisesHeading}>Available Exercises</Text>
          <FlatList
            horizontal
            style={styles.exercises}
            contentContainerStyle={styles.exercises}
            data={exercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const isSelected = selectedExercises.includes(item);

              return (
                <Pressable
                  style={[
                    styles.exercise,
                    isSelected && styles.selectedExercise,
                  ]}
                  onPress={() => toggleExercise(item, isSelected)}
                >
                  <Text style={isSelected && styles.selectedExerciseText}>
                    {item.title}
                  </Text>
                </Pressable>
              );
            }}
            ListEmptyComponent={
              <Link onPress={() => setModalVisible(false)} href="/exercises">
                Add exercises
              </Link>
            }
          />
        </View>

        <View>
          <Text style={styles.exercisesHeading}>Selected Exercises</Text>
          <FlatList
            horizontal
            style={styles.exercises}
            contentContainerStyle={styles.exercises}
            data={selectedExercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const isSelected = selectedExercises.includes(item);

              return (
                <Pressable
                  style={[
                    styles.exercise,
                    isSelected && styles.selectedExercise,
                  ]}
                  onPress={() => toggleExercise(item, isSelected)}
                >
                  <Text style={isSelected && styles.selectedExerciseText}>
                    {item.title}
                  </Text>
                </Pressable>
              );
            }}
            ListEmptyComponent={<Text>No exercises selected</Text>}
          />
        </View>
        {selectedExercisesError && (
          <Text style={styles.errorMsg}>{selectedExercisesError}</Text>
        )}

        <Button title="Add Workout" onPress={handleSubmit(onSubmit)} />
      </View>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 20,
  },
  input: {
    borderWidth: 2,
    paddingInline: 20,
    paddingBlock: 15,
    borderRadius: 5,
  },
  errorMsg: {
    color: "red",
    textAlign: "center",
  },
  exercisesHeading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  exercises: {
    gap: 20,
    flexGrow: 1,
  },
  exercise: {
    borderWidth: 2,
    paddingInline: 20,
    paddingBlock: 15,
    borderRadius: 5,
  },
  selectedExercise: {
    borderColor: Platform.OS === "ios" ? "#007AFF" : "#2196F3",
  },
  selectedExerciseText: {
    color: Platform.OS === "ios" ? "#007AFF" : "#2196F3",
  },
});
