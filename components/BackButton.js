import { Pressable, StyleSheet, Text } from "react-native";
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';

export function BackButton({ href }) {
    const router = useRouter();

    return (
        <Pressable
            onPress={() => router.push(href)}
            style={styles.button}
        >
            <BlurView
                intensity={80}
                tint="light"
                style={styles.blurContainer}
            >
                <Text style={styles.title}>Back</Text>
            </BlurView>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        overflow: 'hidden', // Importante para que el blur respete el borderRadius
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5, // Para Android
    },
    blurContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // Fondo semi-transparente
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    }
});