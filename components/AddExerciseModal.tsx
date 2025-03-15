import { StyleSheet, View, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import CustomModal from "./CustomModal";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";

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
            <CustomInput
              autoCapitalize="words"
              placeholder="Title"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="title"
        />
        {errors.title && <Text style={styles.error}>Title is required.</Text>}
        <CustomButton title="Add Exercise" onPress={handleSubmit(onSubmit)} />
      </View>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 20,
  },
  error: {
    color: "red",
    textAlign: "center",
  },
});
