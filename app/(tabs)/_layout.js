import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme, StyleSheet } from 'react-native';



export default function TabsLayout() {
  
  const colorScheme = useColorScheme();

  const bgColor = colorScheme === 'light' ? '#F1F4F6' : '#121212';
  const textColor = colorScheme === 'light' ? '#333A3F' : '#F1F4F6';

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: bgColor
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
          color: textColor
        },
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: bgColor,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerTitle: "Home", // Título del header
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerTitle: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bgColorDark:{
    backgroundColor: '#121212'
  },
  bgColorWhite:{
    backgroundColor: '#F1F4F6'
  }
})