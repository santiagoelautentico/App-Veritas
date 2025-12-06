// Import Libreries
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  useColorScheme,
} from "react-native";
import { BlurView } from "expo-blur";
import { API_URL, URL_NETWORK } from "../constants/api";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import Components
import bgDark from "../assets/bgAppDark.png";
import { BackButton } from "../components/BackButton";
import { InputLogin } from "../components/InputLogin";
export default function LoginRegularUser() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const colorText =
    colorScheme === "dark" ? styles.textWhite : styles.TextBlack;
  const bgButton =
    colorScheme === "light" ? styles.bgButtonBlue : styles.bgButtonYellow;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginFetch = async (email, password) => {
    await AsyncStorage.removeItem("authToken");

    try {
      const response = await fetch(`${URL_NETWORK}loginUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      const token = data.token;

      if (!response.ok) {
        console.log("Login Fail", data.message);
        return null;
      }

      if (!token || token === "undefined") {
        console.log("Token inválido");
        return null;
      }

      await AsyncStorage.setItem("authToken", token);
      await AsyncStorage.setItem("dataUser", JSON.stringify(data));

      console.log("Correct Login", data);
      console.log("Token guardado", token);

      router.push("/home");
      return data;
    } catch (error) {
      console.error("Network Error", error);
      return null;
    }
  };
  return (
    <>
      <Image source={bgDark} style={styles.bgDarkImage} />
      <View style={styles.container}>
        <BlurView
          intensity={80}
          tint={colorScheme === "dark" ? "dark" : "light"}
          style={styles.loginContainer}
        >
          <View style={styles.headerLogin}>
            <Text style={[styles.title, colorText]}>Login</Text>
            <Text style={[styles.subtitle, colorText]}>
              Please Sign and continue
            </Text>
          </View>
          <View style={styles.containerInputs}>
            <View style={styles.containerInput}>
              <Text style={[styles.inputTitle, colorText]}>Email</Text>
              <InputLogin
                value={email}
                onChangeText={setEmail}
                placeholder={"example@gmail.com"}
                secureTextEntry={false}
              />
            </View>
            <View style={styles.containerInput}>
              <Text style={[styles.inputTitle, colorText]}>Password</Text>
              <InputLogin
                value={password}
                onChangeText={setPassword}
                placeholder={"Entry your password"}
                secureTextEntry={true}
              />
            </View>
          </View>
          <Pressable
            style={[styles.button, bgButton]}
            onPress={async () => {
              const data = await loginFetch(email, password);
              console.log("Respuesta del backend:", data);
            }}
          >
            <Text style={styles.textButton}>Login</Text>
          </Pressable>
          <Pressable
            onPress={async () => {
              router.push("/createUserRegular");
            }}
          >
            <Text style={[colorText, styles.link]}>Don't have an account? Sign up here.</Text>
          </Pressable>
        </BlurView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 80,
    paddingHorizontal: 20,
  },
  containerBack: {
    position: "absolute",
    left: 20,
    top: 60,
  },
  bgDarkImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  loginContainer: {
    width: "100%",
    gap: 16,
    padding: 24,
    borderRadius: 36,
    overflow: "hidden",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  textWhite: {
    color: "#F1F4F6",
  },
  TextBlack: {
    color: "#333A3F",
  },
  headerLogin: {
    gap: 4,
  },
  inputTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  containerInput: {
    gap: 8,
  },
  containerInputs: {
    gap: 12,
  },
  button: {
    padding: 10,
    alignItems: "center",
    borderRadius: 28,
    marginInline: 50,
    borderWidth: 0.5,
    borderColor: "#fff5d3ff",
  },
  textButton: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bgButtonYellow: {
    backgroundColor: "#FFC857",
  },
  link: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
  },
});
