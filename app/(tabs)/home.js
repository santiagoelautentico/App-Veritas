import { FlatList, StyleSheet, View, Text, useColorScheme } from "react-native";
import { useState, useEffect } from "react";
import { API_URL, URL_NETWORK } from "../../constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Screen } from "../../components/Screen";

//Import Components
import NewCard from "../../components/newsCard";

export default function Home() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const textColor =
    colorScheme === "dark" ? styles.textWhite : styles.textBlack;
  const [news, setNews] = useState([]);
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
      const response = await fetch(`${URL_NETWORK}news`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setNews(data.news);
      console.log("All the news from data", data);
      console.log("Cont news:", data.news?.length);
    } catch (error) {
      console.error("Error to get News", error);
    }
  };
  useEffect(() => {
    haveToken();
    getNews();
  }, []);
  return (
    <Screen>
      <View
        style={news.length > 0 ? styles.container : styles.containerNotNews}
      >
        {news.length > 0 ? (
          <FlatList
            data={news}
            contentContainerStyle={styles.contentContainer}
            keyExtractor={(item) => item.id_news.toString()}
            renderItem={({ item }) => (
              <NewCard
                id_news={item.id_news}
                title={item.title}
                id_country={item.id_country}
                subtitle={item.subtitle}
                body={item.body}
                created_at={item.created_at}
                picture_url={item.picture_url}
                username={item.username}
                type_of_journalist={item.type_of_journalist}
                picture={item.picture}
              />
            )}
          />
        ) : (
          <Text style={[styles.text, textColor]}>Not news for now 😢</Text>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  containerNotNews: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  textWhite: {
    color: "#F1F4F6",
  },
});
