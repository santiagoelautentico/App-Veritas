import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Alert,
  useColorScheme,
  ScrollView
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import { API_URL, URL_NETWORK } from "../constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

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
  const [imageUri, setImageUri] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permiso denegado", "Necesitamos acceso a tus fotos");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.7,
        base64: true,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
        setImageBase64(`data:image/jpeg;base64,${result.assets[0].base64}`);
        console.log("Imagen seleccionada");
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "No se pudo seleccionar la imagen");
    }
  };

  const createAccountFetch = async (
    name_user,
    lastname,
    username,
    email,
    password,
    id_country
  ) => {
    console.log("¿Tiene imagen?", !!imageBase64);
    console.log("Tamaño del base64:", imageBase64?.length);
    await AsyncStorage.removeItem("authToken");
    try {
      const response = await fetch(`${URL_NETWORK}registerRegularUser`, {
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
          ...(imageBase64 && { picture: imageBase64 }),
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
      <ScrollView style={styles.container}>
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
          <View style={styles.containerInput}>
            <Text style={[colorText, styles.titleInput]}>
              Cover image (optional)
            </Text>
            <Pressable style={styles.imageButton} onPress={pickImage}>
              <Text style={styles.imageButtonText}>📷 Select from Gallery</Text>
            </Pressable>
            {imageUri && (
              <View style={styles.imagePreview}>
                <Image source={{ uri: imageUri }} style={styles.image} />
                <Pressable
                  style={styles.removeButton}
                  onPress={() => {
                    setImageUri(null);
                    setImageBase64(null);
                  }}
                >
                  <Text style={styles.removeButtonText}>✕ Remove Image</Text>
                </Pressable>
              </View>
            )}
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
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 110
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
    imageButton: {
    backgroundColor: "#E8F5E9",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  imageButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2E7D32",
  },
  imagePreview: {
    marginTop: 10,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  removeButton: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  removeButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 12,
  },
});
