import { View, Text, StyleSheet, useColorScheme } from "react-native";

export default function TagCategory({ category }) {
  const colorScheme = useColorScheme();

  const colorText =
    colorScheme === "light" ? styles.textBlack : styles.textWhite;

  const categoryNames = {
    1: "Policy",
    2: "Economy",
    3: "Pop Culture",
    4: "Sports",
    5: "Medicine",
    6: 'Anime'
  };

  return (
    <View style={styles.tagContainer}>
      <Text style={[colorText, styles.text]}>{categoryNames[category] || `Category ${category}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textBlack: {
    color: "#000000",
  },
  textWhite: {
    color: "#F1F4F6",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
  tagContainer: {
    backgroundColor: '#0F4C81',
    paddingBlock: 8,
    paddingHorizontal: 10,
    borderRadius: 28
  }
});
