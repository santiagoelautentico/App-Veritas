import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
  useColorScheme,
  Touchable,
} from "react-native";
import { useEffect, useState } from "react";
import CloseSession from "../../components/CloseSession";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CountryProfile from "../../components/CountryProfile";
import { useRouter } from "expo-router";
import { API_URL, URL_NETWORK } from "../../constants/api";
import NewCard from "../../components/newsCard";
import { Ionicons } from "@expo/vector-icons";
import Fontisto from "@expo/vector-icons/Fontisto";

export default function profile() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [userData, setUser] = useState("");
  const [fetchDataUser, setFetchDataUser] = useState("");
  const [news, setNews] = useState([]);
  const bgStyle = colorScheme === "light" ? styles.bgWhite : styles.bgBlack;
  const colorText =
    colorScheme === "light" ? styles.textBlack : styles.textWhite;
  const bgButton =
    colorScheme === "light" ? styles.bgButtonBlue : styles.bgButtonYellow;
  const txtButton =
    colorScheme === "light" ? styles.textWhite : styles.TextBlack;
  const icon = colorScheme === "light" ? "#333A3F" : "#f1f4f6";
  useEffect(() => {
    const fetchData = async () => {
      const dataUser = await AsyncStorage.getItem("dataUser");
      const dataUserParse = JSON.parse(dataUser);
      const user = dataUserParse.user.user;
      setUser(user);
      console.log("USER PROFILE IS: ", user.id_user);
    };
    fetchData();
  }, []);
  const haveToken = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      console.log("Token en home:", token);
      if (!token || token === "undefined") {
        setTimeout(() => {
          router.push("loginRegularUser");
        }, 500);
      }
    } catch (error) {
      console.error("Error leyendo token", error);
    }
  };
  const getNews = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      console.log("token guardado ahora en news", token);
      const response = await fetch(
        `${URL_NETWORK}news/profileNews/${userData.id_user}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log("data recibida del API:", data);
      setNews(data.news);
    } catch (error) {
      console.error("Error to get News", error);
    }
  };
  const getUser = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      console.log("token guardado ahora en news", token);
      const response = await fetch(`${URL_NETWORK}users/${userData.id_user}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("data recibida del API papapaa:", data);
      setFetchDataUser(data.user);
    } catch (error) {
      console.error("Error to get News", error);
    }
  };
  useEffect(() => {
    haveToken();
    if (userData?.id_user) {
      console.log("Llamando getNews con id:", userData.id_user);
      console.log("Estado de news actualizado:", news);
      getNews();
      getUser();
    }
  }, [userData]);

  useEffect(() => {
    console.log("Estado de news actualizado:", news);
  }, [news]);

  return (
    <View style={[styles.container, bgStyle]}>
      <FlatList
        data={news}
        contentContainerStyle={{ paddingBottom: 120 }}
        keyExtractor={(item) => item.id_news.toString()}
        ListHeaderComponent={() => (
          <>
            <View style={styles.empty}></View>
            <View style={styles.header}>
              {userData?.picture && (
                <Image
                  source={{ url: userData?.picture }}
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              )}

              <View style={styles.rigthHeaderContainer}>
                <View style={styles.topHeader}>
                  <Text style={[styles.title, colorText]}>
                    {userData?.username}
                  </Text>
                  <Pressable onPress={() => router.push("configScreen")}>
                    <Fontisto
                      name="player-settings"
                      size={20}
                      color={icon}
                    />
                  </Pressable>
                </View>
                <View style={styles.containerCompany}>
                  <Text style={[colorText, styles.span]}>Work in: </Text>
                  <Text style={[colorText, styles.company]}>
                    {userData?.company}
                  </Text>
                </View>
                <View style={styles.detailsContainer}>
                  <Text style={colorText}>{userData?.ocupation}</Text>
                  <Text style={colorText}>-</Text>
                  <Text style={colorText}>{userData?.type_of_journalist}</Text>
                </View>
              </View>
            </View>
            <View style={[styles.bioContainer, colorText]}>
              <Text style={[styles.subtitle, colorText]}>Biography</Text>
              <Text style={colorText}>{userData?.biography}</Text>
            </View>
            <Text style={[styles.subtitle, colorText]}>Posts</Text>
          </>
        )}
        renderItem={({ item }) => (
          <NewCard
            id_news={item.id_news}
            title={item.title}
            id_country={item.id_country}
            category={item.id_category}
            subtitle={item.subtitle}
            body={item.body}
            created_at={item.created_at}
            picture_url={item.picture_url}
            username={item.username}
            type_of_journalist={item.type_of_journalist}
            picture={item.picture}
          />
        )}
        ListEmptyComponent={
          <Text style={[styles.text, colorText]}>
            You dont have news yet, Create a notice clicking the bottom bellow
          </Text>
        }
      />

      {fetchDataUser?.status_account === 1 && (
        <Pressable
          onPress={() => router.push("createNew")}
          style={({ pressed }) => [
            styles.button,
            bgButton,
            pressed && styles.buttonCreatePressed,
          ]}
        >
          <Text style={[styles.textB, txtButton]}>Create a New</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingInline: 20,
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 2,
  },
  detailsContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 2,
    flexWrap: "wrap",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 0,
  },
  bioContainer: {
    gap: 5,
    marginBottom: 20,
  },
  flatList: {},
  contentContainer: {
    paddingBottom: 20,
  },
  button: {
    paddingBlock: 16,
    paddingInline: 20,
    alignItems: "center",
    borderRadius: 28,
    borderWidth: 0.5,
    borderColor: "#fff5d3ff",
    position: "absolute",
    bottom: 90, // Distancia del borde inferior
    alignSelf: "center", // ⬅️ Centra horizontalmente
    maxWidth: 400, // ⬅️ Ancho máximo
  },
  bgButtonYellow: {
    backgroundColor: "#FFC857",
  },
  bgBlack: {
    backgroundColor: "#121212",
  },
  bgWhite: {
    backgroundColor: "#F1F4F6",
  },
  textWhite: {
    color: "#F1F4F6",
  },
  textBlack: {
    color: "#121212",
  },
  textB: {
    fontWeight: "bold",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  empty: {
    height: 70,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingBottom: 20,
  },
  rigthHeaderContainer: {
    flex: 1,
  },
  topHeader: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  span: {
    fontSize: 14,
    opacity: 0.7,
  },
  company: {
    fontSize: 16,
    fontWeight: "bold",
  },
  containerCompany: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  buttonCreatePressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  bgButtonBlue: {
    backgroundColor: "#0F4C81",
  },
});
