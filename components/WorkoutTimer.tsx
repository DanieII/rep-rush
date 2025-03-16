import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Svg, { Circle } from "react-native-svg";
import { getPrimaryColor } from "@/lib/utils";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type WorkoutTimerProps = {
  timer: number;
  totalTime: number;
};

export default function WorkoutTimer({ timer, totalTime }: WorkoutTimerProps) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = (timer / totalTime) * circumference;
  const animatedOffset = useSharedValue(circumference);
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: animatedOffset.value,
  }));

  useEffect(() => {
    animatedOffset.value = withTiming(
      circumference - (timer / totalTime) * circumference,
      {
        duration: 500,
      },
    );
  }, [timer]);

  return (
    <View style={styles.container}>
      <Svg
        style={styles.circle}
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
      >
        <AnimatedCircle
          cx="50"
          cy="50"
          r={radius}
          stroke={getPrimaryColor()}
          strokeWidth="5"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          animatedProps={animatedProps}
        />
      </Svg>
      <Text style={styles.timer}>{timer}</Text>
    </View>
  );
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  timer: {
    position: "absolute",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
  },
  circle: {
    transform: [{ rotate: "-90deg" }],
  },
});
