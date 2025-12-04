import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  useColorScheme,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import { API_URL } from "../constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { InputLogin } from "../components/InputLogin";
import bgDark from "../assets/bgAppDark.png";

export default function createUserRegular() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const colorText =
    colorScheme === "dark" ? styles.textWhite : styles.TextBlack;
  const bgButton =
    colorScheme === "light" ? styles.bgButtonBlue : styles.bgButtonYellow;

  const [name_user, setName_user] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id_country, setCountry] = useState("");

  const createAccountFetch = async (
    name_user,
    lastname,
    username,
    email,
    password,
    id_country
  ) => {
    await AsyncStorage.removeItem("authToken");
    try {
      const response = await fetch(`${API_URL}registerRegularUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name_user,
          lastname,
          username,
          email,
          password,
          id_country,
        }),
      });
      const data = await response.json();
      if (!response) {
        console.log("Login Fail", data.message);
        console.log(name_user, lastname, username, email, password, id_country);
        return null;
      }
      console.log("Correct login", data);
      router.push("/loginRegularUser");
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
            <Text style={[styles.title, colorText]}>Create account</Text>
            <Text style={[styles.subtitle, colorText]}>
              Please fill in all fields and continue
            </Text>
          </View>
          <View style={styles.twoInputsContainer}>
            <View style={styles.containerInputTwo}>
              <Text style={[styles.inputTitle, colorText]}>Name</Text>
              <InputLogin
                value={name_user}
                onChangeText={setName_user}
                placeholder={"Charlie"}
                secureTextEntry={false}
              />
            </View>
            <View style={styles.containerInputTwo}>
              <Text style={[styles.inputTitle, colorText]}>Lastname</Text>
              <InputLogin
                value={lastname}
                onChangeText={setLastname}
                placeholder={"Jhonson"}
                secureTextEntry={false}
              />
            </View>
          </View>
          <View style={styles.containerInput}>
            <Text style={[styles.inputTitle, colorText]}>Username</Text>
            <InputLogin
              value={username}
              onChangeText={setUsername}
              placeholder={"Jhonson"}
              secureTextEntry={false}
            />
          </View>
          <View style={styles.containerInput}>
            <Text style={[styles.inputTitle, colorText]}>Email</Text>
            <InputLogin
              value={email}
              onChangeText={setEmail}
              placeholder={"charlieJhonson@gmail.com"}
              secureTextEntry={false}
            />
          </View>
          <View style={styles.containerInput}>
            <Text style={[styles.inputTitle, colorText]}>Password</Text>
            <InputLogin
              value={password}
              onChangeText={setPassword}
              placeholder={"Insert your password"}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.containerInput}>
            <Text style={[styles.inputTitle, colorText]}>Country</Text>
            <InputLogin
              value={id_country}
              onChangeText={setCountry}
              placeholder={"insert 1 for now"}
              secureTextEntry={false}
            />
          </View>
          <Pressable
            style={[styles.button, bgButton]}
            onPress={async () => {
              const data = await createAccountFetch(
                name_user,
                lastname,
                username,
                email,
                password,
                id_country
              );
              console.log("response from server", data);
            }}
          >
            <Text style={styles.textButton}>Create Acount</Text>
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
  textWhite: {
    color: "#F1F4F6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  inputTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  containerInput: {
    gap: 8,
  },
  containerInputTwo: {
    gap: 8,
    flex: 1,
  },
  twoInputsContainer: {
    flexDirection: "row",
    gap: 20,
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
