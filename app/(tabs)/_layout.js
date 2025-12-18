import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

export default function TabsLayout() {
  const colorScheme = useColorScheme();

  const bgColor = colorScheme === "light" ? "#F1F4F6" : "#121212";
  const textColor = colorScheme === "light" ? "#333A3F" : "#F1F4F6";
  const colorTambs = colorScheme === "dark" ? "#FFC857" : "#0F4C81";
  const colorIcon = colorScheme === "dark" ? "#f1f4f69e" : "#121212";

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: bgColor,
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: "600",
          color: textColor,
        },
        headerShadowVisible: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 10,
          borderRadius: 20,
          backgroundColor: "transparent",
          height: 70,
          marginHorizontal: 16,
          width: undefined,
          borderTopWidth: 0,
        },
        tabBarBackground: () => (
          <BlurView
            intensity={90}
            tint={colorScheme === "light" ? "light" : "dark"}
            style={{
              ...StyleSheet.absoluteFillObject,
              borderRadius: 28,
              overflow: "hidden",
            }}
          />
        ),
        tabBarItemStyle: {
          paddingVertical: 7,
        },
      }}
    >
      <Tabs.Screen
        name="categories"
        options={{
          tabBarActiveTintColor: colorTambs,
          tabBarInactiveTintColor: colorIcon,
          headerTitleStyle: { color: colorTambs, fontWeight: "600" },
          headerTintColor: colorTambs,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarActiveTintColor: colorTambs,
          tabBarInactiveTintColor: colorIcon,
          headerTitleStyle: { color: colorTambs, fontWeight: "600" },
          headerTintColor: colorTambs,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarActiveTintColor: colorTambs,
          tabBarInactiveTintColor: colorIcon,
          headerTitleStyle: { color: colorTambs, fontWeight: "600" },
          headerTintColor: colorTambs,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bgColorDark: {
    backgroundColor: "#121212",
  },
  bgColorWhite: {
    backgroundColor: "#F1F4F6",
  },
});
