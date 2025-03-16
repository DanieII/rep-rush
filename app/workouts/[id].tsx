import CustomButton from "@/components/CustomButton";
import WorkoutHeading from "@/components/WorkoutHeading";
import WorkoutTimer from "@/components/WorkoutTimer";
import { getWorkout } from "@/lib/workouts";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Workout() {
  const { id } = useLocalSearchParams();
  const workout = getWorkout(id as string);
  const [isStarted, setIsStarted] = useState(false);
  const [phase, setPhase] = useState<"exercise" | "rest">("exercise");
  const [timer, setTimer] = useState(workout?.exerciseDuration || 0);
  const [exerciseIndex, setExerciseIndex] = useState(0);

  if (!workout) {
    return <Text>Workout not found</Text>;
  }

  const toggleStart = () => {
    setIsStarted((prev) => !prev);
  };

  const startNextPhase = () => {
    if (phase === "exercise") {
      setTimer(workout.restDuration);
      setPhase("rest");
      setExerciseIndex((prev) => prev + 1);
    } else if (phase === "rest") {
      setTimer(workout.exerciseDuration);
      setPhase("exercise");
    }
  };

  useEffect(() => {
    if (!isStarted) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        const isPhaseFinished = prev === 0;

        if (isPhaseFinished) {
          const isWorkoutFinished =
            exerciseIndex + 1 === workout.exercises.length &&
            phase === "exercise";

          if (isWorkoutFinished) {
            setIsStarted(false);
            router.back();

            return 0;
          } else {
            startNextPhase();
          }
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isStarted, phase, exerciseIndex]);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerTitle: workout.title }} />
      <View style={styles.workout}>
        <View style={styles.workoutHeadingContainer}>
          <WorkoutHeading
            phase={phase}
            exercises={workout.exercises}
            exerciseIndex={exerciseIndex}
          />
        </View>
        <View style={styles.workoutTimerContainer}>
          <WorkoutTimer
            timer={timer}
            totalTime={
              phase === "exercise"
                ? workout.exerciseDuration
                : workout.restDuration
            }
          />
        </View>
        <View style={styles.toggleButtonContainer}>
          <CustomButton
            title={isStarted ? "Pause" : "Start"}
            onPress={toggleStart}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  workout: { flex: 1, justifyContent: "space-between", padding: 30 },
  workoutHeadingContainer: { flex: 1 },
  workoutTimerContainer: { flex: 1 },
  toggleButtonContainer: { flex: 1, justifyContent: "flex-end" },
});
