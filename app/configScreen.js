import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  ScrollView,
  Pressable,
  Image,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { InputLogin } from "../components/InputLogin";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL_NETWORK } from "../constants/api";
import { useRouter } from "expo-router";
import CloseSession from "../components/CloseSession";
import Dropdown from "../components/Dropdown";

export default function configScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const colorText =
    colorScheme === "dark" ? styles.textWhite : styles.TextBlack;

  const textBtn =
    colorScheme === "light" ? styles.txtBtnWhite : styles.txtBtnDark;

  const bgButton =
    colorScheme === "light" ? styles.bgButtonBlue : styles.bgButtonYellow;

  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("");
  const [company, setCompany] = useState("");
  const [journalist, setJournalist] = useState("");
  const [password, setPassword] = useState("");

  const [imageUri, setImageUri] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [loading, setLoading] = useState(false);

  const JOURNALIST_TYPES = [
    { id: "politics", name: "Politics" },
    { id: "economy", name: "Economy & Business" },
    { id: "technology", name: "Technology" },
    { id: "sports", name: "Sports" },
    { id: "entertainment", name: "Entertainment" },
    { id: "culture", name: "Culture & Arts" },
    { id: "health", name: "Health & Wellness" },
    { id: "science", name: "Science" },
    { id: "environment", name: "Environment" },
    { id: "education", name: "Education" },
    { id: "crime", name: "Crime & Justice" },
    { id: "international", name: "International News" },
    { id: "local", name: "Local News" },
    { id: "lifestyle", name: "Lifestyle" },
    { id: "travel", name: "Travel" },
    { id: "food", name: "Food & Gastronomy" },
    { id: "opinion", name: "Opinion & Analysis" },
    { id: "general", name: "General News" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataUser = await AsyncStorage.getItem("dataUser");
        const dataUserParse = JSON.parse(dataUser);
        const user = dataUserParse.user.user;
        setUserData(user);

        // Pre-llenar los campos con los datos actuales
        setUsername(user.username || "");
        setCompany(user.company || "");
        setJournalist(user.type_of_journalist || "");

        console.log("USER LOADED:", user);
      } catch (error) {
        console.error("Error loading user data:", error);
        Alert.alert("Error", "Failed to load user data");
      }
    };
    fetchData();
  }, []);

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
        aspect: [1, 1],
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

  const updateUser = async () => {
    if (!userData?.id_user) {
      Alert.alert("Error", "No user data available");
      return;
    }

    // Construir el body solo con los campos que tienen valor
    const updateData = {};

    if (username && username !== userData.username) {
      updateData.username = username;
    }
    if (company && company !== userData.company) {
      updateData.company = company;
    }
    if (journalist && journalist !== userData.type_of_journalist) {
      updateData.type_of_journalist = journalist;
    }
    if (password) {
      updateData.password = password;
    }
    if (imageBase64) {
      updateData.picture = imageBase64;
    }
    if (Object.keys(updateData).length === 0) {
      Alert.alert("Info", "No changes to update");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `${URL_NETWORK}users/content-creator/${userData.id_user}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        console.log("Update failed:", data.message);
        Alert.alert("Error", data.message || "Failed to update profile");
        return;
      }
      console.log("User updated:", data);
      const updatedUser = { ...userData, ...updateData };
      const dataUser = await AsyncStorage.getItem("dataUser");
      const dataUserParse = JSON.parse(dataUser);
      dataUserParse.user.user = updatedUser;
      await AsyncStorage.setItem("dataUser", JSON.stringify(dataUserParse));

      Alert.alert("Success", "Profile updated successfully", [
        {
          text: "OK",
          onPress: () => {
            setPassword("");
            router.dismissAll();
            router.replace("/home");
          },
        },
      ]);
    } catch (error) {
      console.error("Network Error:", error);
      Alert.alert("Error", "Network error, please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAlert = () => {
    Alert.alert(
      "Update Profile",
      "Are you sure you want to update your profile?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Update",
          onPress: updateUser,
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerBtns}>
        <View style={styles.containerBtn}>
          <Text style={[colorText, styles.titleBtnContainer]}>
            You wanna close your account?
          </Text>
          <CloseSession />
        </View>
        <View style={styles.line}></View>
        <View style={styles.containerBtn}>
          <Text style={[colorText, styles.titleBtnContainer]}>
            You wanna DELETE your account?
          </Text>
          <Pressable style={styles.primaryBtm}>
            <Text style={styles.textBtn}>Delete account</Text>
          </Pressable>
        </View>
        <View style={styles.line}></View>
      </View>

      <View style={styles.containerUpdate}>
        <Text style={[colorText, styles.titleBtnContainer, styles.titleUpdate]}>
          Update your account
        </Text>

        <View style={styles.inputContainer}>
          <Text style={[colorText, styles.labelTitle]}>Username</Text>
          <InputLogin
            value={username}
            onChangeText={setUsername}
            placeholder={"Change your Username"}
            secureTextEntry={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[colorText, styles.labelTitle]}>Company</Text>
          <InputLogin
            value={company}
            onChangeText={setCompany}
            placeholder={"Change your Company"}
            secureTextEntry={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[colorText, styles.labelTitle]}>Type of journalist</Text>
          <Dropdown
            value={journalist}
            onChange={setJournalist}
            options={JOURNALIST_TYPES}
            placeholder="Change your type"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[colorText, styles.labelTitle]}>Password</Text>
          <InputLogin
            value={password}
            onChangeText={setPassword}
            placeholder={"Leave empty to keep current password"}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[colorText, styles.labelTitle]}>
            Profile picture (optional)
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.imageButton,
              pressed && styles.imageButtonPressed,
            ]}
            onPress={pickImage}
          >
            <Text style={styles.imageButtonText}>📷 Select from Gallery</Text>
          </Pressable>

          {/* Preview de la imagen */}
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
          {!imageUri && userData?.picture && (
            <View style={styles.imagePreview}>
              <Text style={[colorText, { fontSize: 12, marginBottom: 5 }]}>
                Current picture:
              </Text>
              <Image source={{ uri: userData.picture }} style={styles.image} />
            </View>
          )}
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.updateButton,
            bgButton,
            loading && styles.buttonDisabled,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleUpdateAlert}
          disabled={loading}
        >
          <Text style={[styles.updateButtonText, textBtn]}>
            {loading ? "Updating..." : "Update Profile"}
          </Text>
        </Pressable>
      </View>

      <View style={styles.empty}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingInline: 20,
    paddingTop: 130,
    paddingBottom: 200,
  },
  containerBtn: {
    gap: 10,
  },
  containerBtns: {
    gap: 20,
  },
  textBtn: {
    fontWeight: "bold",
  },
  titleBtnContainer: {
    fontSize: 18,
    fontWeight: "bold",
  },
  titleUpdate: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  primaryBtm: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: "#FF575A",
    borderRadius: 28,
    alignSelf: "flex-start",
    alignItems: "center",
  },
  secondaryBtn: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderColor: "#FFC857",
    borderWidth: 1,
    borderRadius: 28,
    alignSelf: "flex-start",
    alignItems: "center",
  },
  inputContainer: {
    gap: 10,
  },
  labelTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  textWhite: {
    color: "#F1F4F6",
  },
  TextBlack: {
    color: "#333A3F",
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "white",
    opacity: 0.3,
  },
  containerUpdate: {
    gap: 12,
  },
  imageButton: {
    backgroundColor: "#0F4C81",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#042e53ff",
  },
  imageButtonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  imageButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#F1F4F6",
  },
  imagePreview: {
    marginTop: 10,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: "50%",
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
  updateButton: {
    paddingBlock: 16,
    paddingInline: 20,
    alignItems: "center",
    borderRadius: 28,
    borderWidth: 0.5,
    borderColor: "#fff5d3ff",
    marginTop: 20,
  },

  updateButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bgButtonYellow: {
    backgroundColor: "#FFC857",
  },
  bgButtonBlue: {
    backgroundColor: "#0F4C81",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  empty: {
    height: 100,
  },
  txtBtnWhite: {
    color: "#f1f4f6",
  },
  txtBtnDark: {
    color: "#333A3F",
  },
  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
});
