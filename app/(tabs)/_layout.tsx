import { FontAwesome6 } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 size={24} name="house" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          headerShown: false,
          title: "Workouts",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 size={24} name="dumbbell" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          title: "Exercises",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 size={24} name="bars" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
