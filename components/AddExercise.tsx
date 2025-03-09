import { TextInput, StyleSheet, View, Button, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import CustomModal from "./CustomModal";

type AddExerciseProps = {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  addExercise: (exerciseTitle: string) => void;
};

type FormData = {
  title: string;
};

export default function AddExercise({
  modalVisible,
  setModalVisible,
  addExercise,
}: AddExerciseProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmit = (data: FormData) => {
    const { title } = data;

    addExercise(title);
    setModalVisible(false);
  };

  return (
    <CustomModal modalVisible={modalVisible} setModalVisible={setModalVisible}>
      <View style={styles.form}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              autoCapitalize="words"
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

        <Button title="Add Exercise" onPress={handleSubmit(onSubmit)} />
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
});
