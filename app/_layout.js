import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme, StyleSheet, Image } from "react-native";
import { BlurView } from "expo-blur";
import IconHeaderWhite from "../assets/iconHeaderWhite.png";
import iconBlack from "../assets/iconBlack.png";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const bgColor = colorScheme === "light" ? "#F1F4F6" : "#121212";
  const textColor = colorScheme === "dark" ? "#F1F4F6" : "#121212";
  const bgColorHeader = colorScheme === "dark" ? "#ffc75758" : "#02315bf9";

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: true,
          headerTransparent: true,
          title: "",
          headerBackground: () => (
            <BlurView
              intensity={90}
              tint={colorScheme === "dark" ? "dark" : "light"}
              style={StyleSheet.absoluteFill}
            />
          ),
          contentStyle: { backgroundColor: bgColor },
          headerTitleStyle: { fontWeight: "bold", color: textColor },
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerBackVisible: false,
            headerLeft: () => null,
            gestureEnabled: false,
            headerShown: true,
            color: "black",
            headerTitle: () => (
              <Image
                source={colorScheme === "light" ? iconBlack : IconHeaderWhite}
                style={{
                  width: 80,
                  height: 32,
                  padding: 5,
                  resizeMode: "contain",
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="loginRegularUser"
          options={{
            headerShown: true,
            headerTitle: () => (
              <Image
                source={IconHeaderWhite}
                style={{ width: 80, height: 32, resizeMode: "contain" }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="configScreen"
          options={{
            headerShown: true,
            title: "Settings",
            headerTitleStyle: {
              color: "#f1f4f6",
              fontWeight: "600",
            },
            headerBackground: () => (
              <BlurView
                intensity={10}
                tint="light"
                style={[
                  bgColorHeader,
                  StyleSheet.absoluteFill,
                  { backgroundColor: bgColorHeader },
                ]}
              />
            ),
          }}
        />
        <Stack.Screen
          name="createNew"
          options={{
            headerShown: true,
            title: "Create a New",
            headerTitleStyle: {
              color: "#f1f4f6",
              fontWeight: "600",
            },
            headerBackground: () => (
              <BlurView
                intensity={10}
                tint="light"
                style={[
                  bgColorHeader,
                  StyleSheet.absoluteFill,
                  { backgroundColor: bgColorHeader },
                ]}
              />
            ),
          }}
        />
        <Stack.Screen
          name="loginContentCreator"
          options={{
            headerShown: true,
            headerTitle: () => (
              <Image
                source={IconHeaderWhite}
                style={{ width: 80, height: 32, resizeMode: "contain" }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="createContentCreator"
          options={{
            headerShown: true,
            headerTitle: () => (
              <Image
                source={IconHeaderWhite}
                style={{
                  width: 80,
                  height: 32,
                  resizeMode: "contain",
                  padding: 2,
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="createUserRegular"
          options={{
            headerShown: true,
            headerTitle: () => (
              <Image
                source={IconHeaderWhite}
                style={{
                  width: 80,
                  height: 32,
                  resizeMode: "contain",
                  padding: 2,
                }}
              />
            ),
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
