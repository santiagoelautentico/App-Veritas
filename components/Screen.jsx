import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

export function Screen({ children }) {
  return (
    <SafeAreaView style={styles.safe} edges={['left', 'right']}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 10
  },
});