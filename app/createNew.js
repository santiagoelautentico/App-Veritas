import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  useColorScheme,
  Image,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { API_URL, URL_NETWORK } from "../constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Screen } from "../components/Screen";
import { InputLogin } from "../components/InputLogin";
import { InputBody } from "../components/InputBody";
import { useRouter } from "expo-router";

export default function createNews() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const bgButton =
    colorScheme === "light" ? styles.bgButtonBlue : styles.bgButtonYellow;

  const colorText =
    colorScheme === "dark" ? styles.textWhite : styles.TextBlack;

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState("");
  const [id_category, setCategory] = useState(0);
  const [id_country, setCountry] = useState(0);
  const [sources, setSources] = useState("");
  const [userData, setUser] = useState(null);

  const [imageUri, setImageUri] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const dataUser = await AsyncStorage.getItem("dataUser");
      const dataUserParse = JSON.parse(dataUser);
      const user = dataUserParse.user.user;
      setUser(user);
      console.log("USER PROFILE IS: ", user);
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

  const createNew = async (
    title,
    subtitle,
    body,
    id_country,
    id_category,
    sources
  ) => {
    const id_user = userData?.id_user;

    if (!id_user) {
      console.log("No user data available");
      return null;
    }

    try {
      const response = await fetch(`${URL_NETWORK}news/createNew`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          subtitle,
          body,
          id_country,
          id_category,
          id_user,
          sources,
          ...(imageBase64 && { picture: imageBase64 }),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log("Create News Fail", data.message);
        console.log(
          title,
          subtitle,
          body,
          id_country,
          id_category,
          id_user,
          sources
        );
        return null;
      }
      console.log("News Created", data);

      return data;
    } catch (error) {
      console.error("Network Error", error);
      return null;
    }
  };

  const handleAlert = async () => {
    Alert.alert(
      "Create News",
      "Are you sure you want to create this news?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Create",
          onPress: async () => {
            setLoading(true);
            const data = await createNew(
              title,
              subtitle,
              body,
              id_country,
              id_category,
              sources
            );
            setLoading(false);

            if (data) {
              Alert.alert("Success", "News created successfully", [
                {
                  text: "OK",
                  onPress: () => {
                    router.push(`/news/${data.news.id_news}`);
                  },
                },
              ]);
            } else {
              Alert.alert("Error", "Failed to create news");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <Screen>
      <ScrollView style={styles.containerScroll}>
        <View style={styles.containerInput}>
          <Text style={[colorText, styles.titleInput]}>Add a title</Text>
          <InputLogin
            value={title}
            onChangeText={setTitle}
            placeholder={"Add a Title"}
            secureTextEntry={false}
          />
        </View>
        <View style={styles.containerInput}>
          <Text style={[colorText, styles.titleInput]}>Add a subtitle</Text>
          <InputLogin
            value={subtitle}
            onChangeText={setSubtitle}
            placeholder={"Add a subtitle"}
            secureTextEntry={false}
          />
        </View>
        <View style={styles.containerInput}>
          <Text style={[colorText, styles.titleInput]}>
            Add the body of the news
          </Text>
          <InputBody
            value={body}
            onChangeText={setBody}
            placeholder="Escribe el contenido...
  
Usa Markdown:
# Título grande
## Subtítulo
**Negrita** *Cursiva*"
            secureTextEntry={false}
            showPreview={true}
          />
        </View>
        <View style={styles.containerInput}>
          <Text style={[colorText, styles.titleInput]}>Select the country</Text>
          <InputLogin
            value={id_country.toString()}
            onChangeText={(text) => setCountry(Number(text))}
            placeholder={"put a 1"}
            secureTextEntry={false}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.containerInput}>
          <Text style={[colorText, styles.titleInput]}>
            Select the category
          </Text>
          <InputLogin
            value={id_category.toString()}
            onChangeText={(text) => setCategory(Number(text))}
            placeholder={"put a 1"}
            secureTextEntry={false}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.containerInput}>
          <Text style={[colorText, styles.titleInput]}>Select the sources</Text>
          <InputLogin
            value={sources}
            onChangeText={setSources}
            placeholder={"Add a sources"}
            secureTextEntry={false}
          />
        </View>

        {/* Sección de imagen */}
        <View style={styles.containerInput}>
          <Text style={[colorText, styles.titleInput]}>
            Cover image (optional)
          </Text>

          <Pressable style={styles.imageButton} onPress={pickImage}>
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
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <Pressable
        style={[styles.button, bgButton]}
        onPress={() => handleAlert()}
      >
        <Text style={styles.textButton}>Create News</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  containerInput: {
    gap: 10,
    marginBottom: 10,
  },
  titleInput: {
    fontSize: 14,
    fontWeight: "bold",
  },
  button: {
    paddingBlock: 16,
    paddingInline: 20,
    alignItems: "center",
    borderRadius: 28,
    borderWidth: 0.5,
    borderColor: "#fff5d3ff",
    position: "absolute",
    bottom: 24,
    alignSelf: "center",
    maxWidth: 400,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  textButton: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#121212",
  },
  bgButtonYellow: {
    backgroundColor: "#FFC857",
  },
  bgButtonBlue: {
    backgroundColor: "#4A90E2",
  },
  containerScroll: {
    gap: 10,
    paddingInline: 20,
    paddingTop: 125,
  },
  textWhite: {
    color: "#F1F4F6",
  },
  TextBlack: {
    color: "#333A3F",
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
