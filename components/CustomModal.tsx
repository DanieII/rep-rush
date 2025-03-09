import { FontAwesome6 } from "@expo/vector-icons";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type CustomModalProps = {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  children?: React.ReactNode;
};

export default function CustomModal({
  modalVisible,
  setModalVisible,
  children,
}: CustomModalProps) {
  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <SafeAreaView style={styles.modal}>
        <View style={styles.container}>
          <Pressable onPress={() => setModalVisible(false)}>
            <FontAwesome6 name="xmark" size={24} color="black" />
          </Pressable>
          <View style={styles.content}>{children}</View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 30,
  },
  content: {
    marginBlock: "auto",
  },
});
