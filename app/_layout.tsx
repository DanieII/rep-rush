import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="workouts/[id]"
          options={{ headerTitle: "Workout", headerBackTitle: "Back" }}
        />
      </Stack>
      <Toast />
    </>
  );
}
