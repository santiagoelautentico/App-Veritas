import { View, Text, StyleSheet } from "react-native";
import CloseSession from "../components/CloseSession";
export default function configScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.buttomClose}>
        <CloseSession />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
