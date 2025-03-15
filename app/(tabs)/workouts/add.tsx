import { View, StyleSheet, Text, FlatList } from "react-native";
import { TExercise } from "@/types/exercises";
import { useExerciseStore } from "@/store/exerciseStore";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import ExerciseToggle from "@/components/ExerciseToggle";
import { useWorkoutStore } from "@/store/workoutStore";

type FormData = {
  title: string;
  exerciseDuration: string;
  restDuration: string;
};

export default function AddWorkout() {
  const { exercises, loadExercises } = useExerciseStore();
  const { addWorkout } = useWorkoutStore();
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
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              placeholder="Title"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="title"
        />
        {errors.title && <Text style={styles.error}>Title is required.</Text>}

        <Controller
          control={control}
          rules={{ required: true, min: 1, pattern: /^[0-9]*$/ }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
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
          <Text style={styles.error}>Enter a valid duration.</Text>
        )}

        <Controller
          control={control}
          rules={{ required: true, min: 1, pattern: /^[0-9]*$/ }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
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
          <Text style={styles.error}>Enter a valid rest duration.</Text>
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
                <ExerciseToggle
                  exercise={item}
                  isSelected={isSelected}
                  setSelectedExercises={setSelectedExercises}
                  setSelectedExercisesError={setSelectedExercisesError}
                />
              );
            }}
            ListEmptyComponent={<Link href="/exercises">Add exercises</Link>}
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
                <ExerciseToggle
                  exercise={item}
                  isSelected={isSelected}
                  setSelectedExercises={setSelectedExercises}
                  setSelectedExercisesError={setSelectedExercisesError}
                />
              );
            }}
            ListEmptyComponent={<Text>No exercises selected</Text>}
          />
        </View>
        {selectedExercisesError && (
          <Text style={styles.error}>{selectedExercisesError}</Text>
        )}

        <CustomButton title="Add Workout" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  form: {
    gap: 20,
  },
  error: {
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
});
