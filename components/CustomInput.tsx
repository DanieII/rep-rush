import { StyleSheet, TextInput, TextInputProps } from "react-native";
import React from "react";

type CustomInputProps = TextInputProps & {
  style?: object;
};

export default function CustomInput({ style, ...props }: CustomInputProps) {
  return <TextInput style={[styles.input, style]} {...props} />;
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    paddingInline: 20,
    paddingBlock: 15,
    borderRadius: 5,
  },
});
