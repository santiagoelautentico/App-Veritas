import {Pressable, Text, StyleSheet, useColorScheme} from 'react-native';
import { useRouter } from 'expo-router';

export function SecundaryButton({title, href}) {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const borderButtonColor = colorScheme === 'dark' ? styles.borderColorYellow : styles.borderColorBlue
    const titleButton = colorScheme === 'dark' ? styles.DarkButton : styles.whiteButton
    return (
        <Pressable
            onPress={() => {
                router.push(href)}
            }
            style={[styles.button, borderButtonColor]}
        >
        <Text style={[styles.title, titleButton]}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    whiteButton:{
        color: '#333A3F',
    },
    DarkButton:{
        color: '#F1F4F6',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    borderColorYellow: {
        borderWidth: 2,
        borderColor: '#FFC857',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        flexGrow: 1,
    }
})