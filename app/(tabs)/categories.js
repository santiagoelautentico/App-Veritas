import {
  View,
  StyleSheet,
  Text,
  useColorScheme,
  ScrollView,
  Pressable,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { URL_NETWORK } from "../../constants/api";
import { Screen } from "../../components/Screen";
import CategoryCard from "../../components/CategoryCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import NewCard from "../../components/newsCard";
export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  const colorScheme = useColorScheme();

  const textColor = colorScheme === "dark" ? styles.textWhite : styles.textDark;
  const bgModal = colorScheme === "dark" ? styles.bgDark : styles.bgLight;

  const [news, setNews] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
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
  const getNewsByCategory = async (categoryId) => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      if (!token || token === "undefined") {
        router.push("loginRegularUser");
        return;
      }

      const response = await fetch(
        `${URL_NETWORK}news?category=${categoryId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setNews(data.news);
      console.log("News by category:", data.news?.length);
    } catch (error) {
      console.error("Error to get News", error);
    }
  };
  useEffect(() => {
    categoriesData();
    haveToken();
  }, []);

  const categoriesData = async () => {
    try {
      const response = await fetch(`${URL_NETWORK}categories`);
      const data = await response.json();
      setCategories(data.news);
      console.log(data, "lista de categorias");
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <Screen>
      <ScrollView style={styles.container}>
        <Text style={[textColor, styles.title]}>Categories</Text>
        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <Pressable
              key={category.id_category}
              onPress={async () => {
                setCategoryName(category.name_category);
                setLoading(true);
                await getNewsByCategory(category.id_category);
                setLoading(false);
                setModalVisible(true);
              }}
            >
              <CategoryCard
                key={category.id_category}
                category={category.name_category}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <Modal
        visible={modalVisible}
        style={[bgModal, styles.modalContainer]}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={[bgModal, styles.modalContainer]}>
          <Text style={[textColor, styles.title]}>{categoryName}</Text>
          <View>
            {loading ? (
              <ActivityIndicator
                size="large"
                color="#007AFF"
                style={{ marginTop: 50 }}
              />
            ) : (
              <View>
                {news.length > 0 ? (
                  <FlatList
                    data={news}
                    onPress={() => setModalVisible(false)}
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
                        category={item.id_category}
                        onPress={() => setModalVisible(false)}
                      />
                    )}
                  />
                ) : (
                  <Text style={[styles.text, textColor]}>
                    Not news for now 😢
                  </Text>
                )}
              </View>
            )}
          </View>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    paddingInline: 20,
  },
  textWhite: {
    color: "#F1F4F6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  categoriesContainer: {
    gap: 20,
  },
  bgDark: {
    backgroundColor: "#121212",
  },
  bgLight: {
    backgroundColor: "#f1f4f6",
  },
  modalContainer: {
    flex: 1,
    padding: 20,
  },
});
// "#121212" : "#F1F4F6";
