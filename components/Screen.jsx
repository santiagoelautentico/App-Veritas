import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import { useColorScheme } from 'react-native';

export function Screen({ children }) {
  const colorScheme = useColorScheme()

  const bgStyle = colorScheme === 'light' ? styles.bgWhite : styles.bgBlack
  return (
    <View style={[styles.safe, bgStyle]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  bgBlack:{
    backgroundColor: "#121212",
  },
  bgWhite: {
    backgroundColor: '#F1F4F6'
  }
});