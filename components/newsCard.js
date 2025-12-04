import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";
import { useColorScheme } from "react-native";

export default function NewCard({
  id_news,
  id_country,
  title,
  id_user,
  subtitle,
  created_at,
  body,
  picture_url,
  username,
  type_of_journalist,
  picture,
}) {
  const colorScheme = useColorScheme();

  const countryNames = {
    1: "Uruguay",
    2: "Argentina",
    3: "Spain",
    4: "United States",
  };

  const bgStyle = colorScheme === "light" ? styles.bgWhite : styles.bgBlack;
  const colorText =
    colorScheme === "light" ? styles.textBlack : styles.textWhite;

  const date = new Date(created_at);
  const formatteDate = new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
  }).format(date);
  return (
    <TouchableOpacity
      key={id_news}
      style={[styles.container, bgStyle]}
      onPress={() => {
        router.push(`/news/${id_news}`);
      }}
    >
      <View style={styles.headerNews}>
        {picture && (
          <Image
            source={{ url: picture }}
            style={styles.profileImage}
            resizeMode="cover"
          />
        )}
        <View>
          <Text key={id_user} style={[colorText, styles.username]}>
            {username}
          </Text>
          <Text style={[colorText, styles.typeJor]}>{type_of_journalist}</Text>
        </View>
        <Text style={[colorText, styles.date]}>{formatteDate}</Text>
      </View>

      <View style={styles.titleContainer}>
        <Text style={[styles.title, colorText]}>{title}</Text>
      </View>
      {picture_url && (
        <Image
          source={{ uri: picture_url }}
          style={styles.newsImage}
          resizeMode="cover"
        />
      )}
      <Text key={id_country} style={[colorText, styles.country]}>
        {countryNames[id_country]}
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 28,
  },
  textWhite: {
    color: "#F1F4F6",
  },
  headerNews: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  titleContainer: {
    marginBottom: 10,
    gap: 5,
  },
  title: {
    fontSize: 21,
    fontWeight: "bold",
    padding: 0,
  },
  subtitle: {
    fontSize: 16,
  },
  newsImage: {
    width: "100%",
    height: 200,
    borderRadius: 28,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
  },
  date: {
    marginTop: 5,
  },
  typeJor: {
    opacity: 0.8,
  },
  country: {
    opacity: 0.8,
    marginTop: 10
  }
});
