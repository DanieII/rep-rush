import CustomButton from "@/components/CustomButton";
import { getWorkout } from "@/lib/workouts";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

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

    if (exerciseIndex === workout.exercises.length) {
      setIsStarted(false);
      router.back();

      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 0) {
          startNextPhase();
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isStarted, phase, exerciseIndex]);

  return (
    <View>
      <Text>Workout: {workout.title}</Text>
      <Text>{timer}</Text>
      <Text>
        Exercise:
        {workout.exercises[exerciseIndex]?.title ||
          workout.exercises[exerciseIndex - 1].title}
      </Text>
      <CustomButton
        title={isStarted ? "Pause" : "Start"}
        onPress={toggleStart}
      />
    </View>
  );
}
