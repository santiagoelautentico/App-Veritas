import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const bgColor = colorScheme === 'light' ? '#F1F4F6' : '#121212';
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: bgColor }, // ⬅️ Importante
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* Otras pantallas fuera de tabs */}
      </Stack>
    </SafeAreaProvider>
  );
}