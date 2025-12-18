import { Pressable, Text, StyleSheet, useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import MaterialIcons from "react-native-vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";

export default function CloseSession() {
  const router = useRouter();

  const colorScheme = useColorScheme();

  const text = colorScheme === "light" ? styles.textDark : styles.textWhite;
  const icon = colorScheme === "light" ? "#333A3F" : "#f1f4f6";
  const border =
    colorScheme === "light" ? styles.borderBlue : styles.borderYellow;

  return (
    <Pressable
      style={[styles.button, border]}
      onPress={async () => {
        await AsyncStorage.removeItem("authToken");
        await AsyncStorage.removeItem("dataUser");
        router.dismissAll();
        router.replace("/");
      }}
    >
      <Entypo name="log-out" size={16} color={icon} />
      <Text style={[text, styles.textButton]}>Close Account</Text>
    </Pressable>
    /* <Pressable style={styles.secondaryBtn}>
                    <Text style={[colorText, styles.textBtn]}>Close Account</Text>
                  </Pressable> */
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderRadius: 28,
    alignSelf: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    gap: 2,
  },
  textButton: {
    fontWeight: "bold",
  },
  borderBlue: {
    borderColor: "#0F4C81",
  },
  borderYellow: {
    borderColor: "#FFC857",
  },
  textDark: {
    color: "#333A3F",
  },
  textWhite: {
    color: "#f1f4f6",
  },
});
