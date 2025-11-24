import {Pressable, Touchable, Text, StyleSheet} from 'react-native';
import { useRouter } from 'expo-router';

export function PrimaryButton({title, href}) {
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
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#0F4C81',
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        flexGrow: 1,
    }
})