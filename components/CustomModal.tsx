import { FontAwesome6 } from "@expo/vector-icons";
import { Modal, Pressable, StyleSheet, View, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

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
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <Pressable onPress={() => setModalVisible(false)}>
              <FontAwesome6 name="xmark" size={24} color="black" />
            </Pressable>
            <View>{children}</View>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    gap: 30,
    padding: 30,
  },
});
