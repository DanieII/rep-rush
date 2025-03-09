import {
  Modal,
  TextInput,
  StyleSheet,
  View,
  SafeAreaView,
  Button,
  Pressable,
  Text,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";

type AddExerciseModalProps = {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  addExercise: (exerciseTitle: string) => void;
};

type FormData = {
  title: string;
};

export default function AddExerciseModal({
  modalVisible,
  setModalVisible,
  addExercise,
}: AddExerciseModalProps) {
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
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Pressable
            style={styles.closeBtn}
            onPress={() => setModalVisible(false)}
          >
            <FontAwesome6 name="xmark" size={24} color="black" />
          </Pressable>
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
              <Text style={styles.errorMsg}>Exercise title is required.</Text>
            )}
            <Button title="Add Exercise" onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: { flex: 1 },
  modalContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  closeBtn: {
    alignSelf: "flex-start",
  },
  form: {
    width: "100%",
    marginBlock: "auto",
    gap: 20,
  },
  input: {
    width: "100%",
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
