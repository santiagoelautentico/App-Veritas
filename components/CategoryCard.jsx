import { Text, StyleSheet, useColorScheme } from "react-native";
import { BlurView } from "expo-blur";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function CategoryCard({ category }) {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? styles.textWhite : styles.textDark;



  return (
    <BlurView intensity={80} tint="dark" style={styles.blur}>
      <Text style={[textColor, styles.title]}>{category}</Text>
      <MaterialIcons name="keyboard-arrow-right" size={24} color="#F1F4F6" />
    </BlurView>
  );
}

const styles = StyleSheet.create({
  blur: {
    paddingVertical: 18,
    flex: 1,
    borderRadius: 28,
    paddingLeft: 20,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20,
  },
  textWhite: {
    color: "#F1F4F6",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  }
});
