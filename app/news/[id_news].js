import { View, Text, StyleSheet, useColorScheme, Image } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { API_URL, URL_NETWORK } from "../../constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DetailNews() {
  //consts
  const params = useLocalSearchParams();
  const idNews = params.id_news;
  const [newsData, setNewsData] = useState(null);
  const colorScheme = useColorScheme();
  const textColor =
    colorScheme === "light" ? styles.blackText : styles.whiteText;

  const haveToken = async () => {
    const token = await AsyncStorage.getItem("authToken");
    if (!token) {
      router.push("loginRegularUser");
    }
  };

  const getNews = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      console.log("token guardado ahora en news", token);
      const response = await fetch(`${URL_NETWORK}news/${idNews}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setNewsData(data.news[0]);
      console.log(data.news[0], "data de la noti");
    } catch (error) {
      console.error("Error to get News", error);
    }
  };

  useEffect(() => {
    haveToken();
    getNews();
  }, []);

  if (!newsData) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={textColor}>Loading...</Text>
      </View>
    );
  }

  const date = new Date(newsData.created_at);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
  }).format(date);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftSide}>
          <Image
            source={{ url: newsData.picture }}
            style={styles.profileImg}
            resizeMode="cover"
          />
          <View style={styles.usernameContainer}>
            <Text style={[textColor, styles.username]}>
              {newsData.username}
            </Text>
            <Text style={[textColor, styles.opacityText]}>
              {newsData.type_of_journalist}
            </Text>
          </View>
        </View>
        <Text style={[textColor, styles.date]}>{formattedDate}</Text>
      </View>
      <Image source={{ uri: newsData.picture_url }} style={styles.picture} />
      <View style={styles.headerNews}>
        <Text style={[styles.title, textColor]}>{newsData.title}</Text>
        <Text style={[styles.subtitle, textColor]}>{[newsData.subtitle]}</Text>
      </View>
      <Text style={textColor}>{newsData.body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingInline: 20,
    paddingBlock: 110,
    gap: 20,
  },
  headerNews: {
    gap: 5,
  },
  title: {
    fontSize: 21,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  whiteText: {
    color: "#F1F4F6",
  },
  blackText: {
    color: "#333A3F",
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  header: {
    flexDirection: "row",
    gap: 10,
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
  },
  opacityText: {
    opacity: 0.8,
  },
  picture: {
    width: "100%",
    height: 200,
    borderRadius: 28,
  },
  date: {
    marginTop: 10
  }
});
