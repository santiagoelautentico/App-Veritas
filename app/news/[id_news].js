import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Image,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { API_URL, URL_NETWORK } from "../../constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Markdown from "react-native-markdown-display";

export default function DetailNews() {
  //consts
  const params = useLocalSearchParams();
  const idNews = params.id_news;
  const [newsData, setNewsData] = useState(null);
  const colorScheme = useColorScheme();
  const textColor =
    colorScheme === "light" ? styles.blackText : styles.whiteText;

  const markdownStyles = {
    body: {
      color: colorScheme === "light" ? "#333A3F" : "#F1F4F6",
    },
    heading1: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
      color: colorScheme === "light" ? "#333A3F" : "#F1F4F6",
    },
    heading2: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 8,
      color: colorScheme === "light" ? "#333A3F" : "#F1F4F6",
    },
    heading3: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 6,
      color: colorScheme === "light" ? "#333A3F" : "#F1F4F6",
    },
    paragraph: {
      marginBottom: 10,
      color: colorScheme === "light" ? "#333A3F" : "#F1F4F6",
      lineHeight: 22,
    },
    text: {
      color: colorScheme === "light" ? "#333A3F" : "#F1F4F6",
    },
    strong: {
      fontWeight: "bold",
    },
    em: {
      fontStyle: "italic",
    },
  };

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
    <ScrollView style={styles.container}>
      {/* <View style={styles.header}>
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
      </View> */}
      <View style={styles.headerNews}>
        {newsData.picture && (
          <Image
            source={{ url: newsData.picture }}
            style={styles.profileImage}
            resizeMode="cover"
          />
        )}
        <View>
          <View style={styles.rigthtopHeader}>
            <Text key={newsData?.id_user} style={[textColor, styles.username]}>
              {newsData.username}
            </Text>
            <View style={styles.point}></View>
            <Text style={[textColor, styles.date]}>{formattedDate}</Text>
          </View>
          <Text style={[textColor, styles.typeJor]}>
            {newsData.type_of_journalist}
          </Text>
        </View>
      </View>
      <Image source={{ uri: newsData.picture_url }} style={styles.picture} />
      <View style={styles.titleNews}>
        <Text style={[styles.title, textColor]}>{newsData.title}</Text>
        <Text style={[styles.subtitle, textColor]}>{[newsData.subtitle]}</Text>
      </View>
      <Markdown style={markdownStyles}>{newsData.body}</Markdown>
      <View style={styles.empty}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingInline: 20,
    paddingBlock: 120,
  },
  headerNews: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
    alignItems: 'center'
  },
  titleNews: {
    gap: 5,
  },
  title: {
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 1,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
    marginBottom: 20,
  },
  whiteText: {
    color: "#F1F4F6",
  },
  blackText: {
    color: "#333A3F",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  header: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
  },
  typeJor: {
    opacity: 0.8,
  },
  country: {
    opacity: 0.8,
    marginTop: 10,
  },
  picture: {
    width: "100%",
    height: 200,
    borderRadius: 28,
    marginBottom: 20,
  },
  empty: {
    height: 50,
    flex: 1,
  },
  rigthtopHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  point: {
    width: 5,
    height: 5,
    backgroundColor: "#F1F4F6",
  },
});
