import { View, Text, StyleSheet } from "react-native";

export default function TagCategory({ category }) {
  const categoryNames = {
    1: "Policy",
    2: "Economy",
    3: "Pop Culture",
    4: "Sports",
    5: "Medicine",
    6: "Anime",
  };

  return (
    <View style={styles.tagContainer}>
      <Text style={styles.text}>
        {categoryNames[category] || `Category ${category}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#F1F4F6",
  },
  tagContainer: {
    backgroundColor: "#0F4C81",
    paddingBlock: 8,
    paddingHorizontal: 10,
    borderRadius: 28,
  },
});
