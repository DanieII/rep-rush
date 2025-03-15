import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { getPrimaryColor } from "@/lib/utils";
import { Href, router } from "expo-router";

type CustomButtonProps = {
  title: string;
  onPress?: () => void;
  link?: Href;
};

export default function CustomButton({
  title,
  onPress,
  link,
}: CustomButtonProps) {
  const handlePress = () => {
    if (link) {
      router.push(link);
    } else if (onPress) {
      onPress();
    }
  };

  return (
    <Pressable style={styles.button} onPress={handlePress}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingInline: 20,
    paddingBlock: 15,
    borderRadius: 5,
    backgroundColor: getPrimaryColor(),
    marginInline: "auto",
  },
  title: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
