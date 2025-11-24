import {Pressable, Touchable, Text, StyleSheet} from 'react-native';
import { useRouter } from 'expo-router';

export function SecundaryButton({title, href}) {
    const router = useRouter();
    return (
        <Pressable
            onPress={() => {
                router.push(href)}
            }
            style={styles.button}
        >
        <Text style={styles.title}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    title: {
        color: '#333A3F',
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: {
        borderWidth: 2,
        borderColor: '#0F4C81',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        flexGrow: 1,
    }
})