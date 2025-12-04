import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  useColorScheme,
  Image,
} from "react-native";
import { useState } from "react";
import { API_URL } from "../constants/api";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import bgDark from "../assets/bgAppDark.png";
import { InputLogin } from "../components/InputLogin";
import { BlurView } from "expo-blur";

export default function createContentCreator() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const colorText =
    colorScheme === "dark" ? styles.textWhite : styles.TextBlack;
  const bgButton =
    colorScheme === "light" ? styles.bgButtonBlue : styles.bgButtonYellow;

  //Uses States
  const [name_user, setNameUser] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id_country, setIdCountry] = useState("");
  const [ocupation, setOcupation] = useState("");
  const [company, setCompany] = useState("");
  const [type_of_journalist, setTypeOfJournalist] = useState("");
  const [identification, setIdentification] = useState("");
  const [biography, setBiography] = useState("");

  const createCreatorFetch = async (
    name_user,
    lastname,
    username,
    email,
    password,
    id_country,
    ocupation,
    company,
    type_of_journalist,
    identification,
    biography
  ) => {
    await AsyncStorage.removeItem("authToken");
    try {
      const response = await fetch(`${API_URL}registerContentCreator`, {
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
          ocupation,
          company,
          type_of_journalist,
          identification,
          biography,
        }),
      });
      const data = await response.json();
      if (!response) {
        console.log("Login Fail", data.message);
        console.log(
          name_user,
          lastname,
          username,
          email,
          password,
          id_country,
          ocupation,
          company,
          type_of_journalist,
          identification,
          biography
        );
        return null;
      }
      console.log("User Created", data);
      router.push("/loginContentCreator");
    } catch {
      console.error("Network Error", error);
      return null;
    }
  };
  return (
    <>
      <Image source={bgDark} style={styles.bgDarkImage} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
      >
        <BlurView
          intensity={80}
          tint={colorScheme === "dark" ? "dark" : "light"}
          style={styles.loginContainer}
        >
          <View style={styles.headerLogin}>
            <Text style={[styles.title, colorText]}>Request an account</Text>
            <Text style={[styles.subtitle, colorText]}>
              The maximum response time is two weeks. Complete all the mandatory
              fields.
            </Text>
          </View>
          <View style={styles.twoInputsContainer}>
            <View style={styles.containerInputTwo}>
              <Text style={[styles.inputTitle, colorText]}>Name</Text>
              <InputLogin
                value={name_user}
                onChangeText={setNameUser}
                placeholder={"Charlie"}
                secureTextEntry={false}
              />
            </View>
            <View style={styles.containerInputTwo}>
              <Text style={[styles.inputTitle, colorText]}>Lastname</Text>
              <InputLogin
                value={lastname}
                onChangeText={setLastname}
                placeholder={"Jackson"}
                secureTextEntry={false}
              />
            </View>
          </View>
          <View style={styles.containerInput}>
            <Text style={[styles.inputTitle, colorText]}>Username</Text>
            <InputLogin
              value={username}
              onChangeText={setUsername}
              placeholder={"CharlieJackson"}
              secureTextEntry={false}
            />
          </View>
          <View style={styles.containerInput}>
            <Text style={[styles.inputTitle, colorText]}>Email</Text>
            <InputLogin
              value={email}
              onChangeText={setEmail}
              placeholder={"CJackson@gmail.com"}
              secureTextEntry={false}
            />
          </View>
          <View style={styles.containerInput}>
            <Text style={[styles.inputTitle, colorText]}>Country</Text>
            <InputLogin
              value={id_country}
              onChangeText={setIdCountry}
              placeholder={"for the momento put 1"}
              secureTextEntry={false}
            />
          </View>
          <View style={styles.containerInput}>
            <Text style={[styles.inputTitle, colorText]}>Ocupation</Text>
            <InputLogin
              value={ocupation}
              onChangeText={setOcupation}
              placeholder={"Freelance Journalist"}
              secureTextEntry={false}
            />
          </View>
          <View style={styles.containerInput}>
            <Text style={[styles.inputTitle, colorText]}>Company</Text>
            <InputLogin
              value={company}
              onChangeText={setCompany}
              placeholder={"Charlie Jackson Journal"}
              secureTextEntry={false}
            />
          </View>
          <View style={styles.containerInput}>
            <Text style={[styles.inputTitle, colorText]}>
              Type of Journalist
            </Text>
            <InputLogin
              value={type_of_journalist}
              onChangeText={setTypeOfJournalist}
              placeholder={"Policy Journalist"}
              secureTextEntry={false}
            />
          </View>
          <View style={styles.containerInput}>
            <Text style={[styles.inputTitle, colorText]}>Identification</Text>
            <InputLogin
              value={identification}
              onChangeText={setIdentification}
              placeholder={"Put your identification"}
              secureTextEntry={false}
            />
          </View>
          <View style={styles.containerInput}>
            <Text style={[styles.inputTitle, colorText]}>Biography</Text>
            <InputLogin
              value={biography}
              onChangeText={setBiography}
              placeholder={"Add a biography"}
              secureTextEntry={false}
            />
          </View>
          <View style={styles.containerInput}>
            <Text style={[styles.inputTitle, colorText]}>Password</Text>
            <InputLogin
              value={password}
              onChangeText={setPassword}
              placeholder={"Add a password"}
              secureTextEntry={true}
            />
          </View>
        </BlurView>
      </ScrollView>
      <Pressable
        style={[styles.button, bgButton]}
        onPress={async () => {
          const data = await createCreatorFetch(
            name_user,
            lastname,
            username,
            email,
            password,
            id_country,
            ocupation,
            company,
            type_of_journalist,
            identification,
            biography
          );
          console.log("response from server", data);
        }}
      >
        <Text style={styles.textButton}>Send Request</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  ScrollView: {
    flex: 1,
  },

  container: {
    paddingTop: 64,
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
    marginBottom: 112,
    marginTop: 50
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
  inputTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  bgButtonYellow: {
    backgroundColor: "#FFC857",
  },
  button: {
    paddingBlock: 16,
    paddingInline: 20,
    alignItems: "center",
    borderRadius: 28,
    borderWidth: 0.5,
    borderColor: "#fff5d3ff",
    position: "absolute",
    bottom: 24, // Distancia del borde inferior
    alignSelf: "center", // ⬅️ Centra horizontalmente
    maxWidth: 400, // ⬅️ Ancho máximo
  },
  textButton: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
