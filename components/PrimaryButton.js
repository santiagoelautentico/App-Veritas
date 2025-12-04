import { Pressable, Touchable, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useColorScheme } from "react-native";

export function PrimaryButton({ title, href }) {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const bgButton =
    colorScheme === "light" ? styles.bgButtonBlue : styles.bgButtonYellow;
  return (
    <Pressable
      onPress={() => {
        router.push(href);
      }}
      style={[styles.button, bgButton]}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    flexGrow: 1,
  },
  bgButtonYellow: {
    backgroundColor: "#FFC857",
  },
});
