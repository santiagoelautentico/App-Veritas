import { Pressable, View, StyleSheet, Text} from "react-native";
import { useRouter } from 'expo-router';

export function BackButton({href}) {
    const router = useRouter();

    return (
        <Pressable
        onPress={() => {
                router.push(href)}
            }
        style={styles.button}
        >
        <Text style={styles.title}>Back</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button:{
        padding: 8,
        color: 'black',
        borderRadius: 28,
        borderWidth: 1,
        borderColor: 'black'
    },
    title:{
        fontSize: 16,
    }
})

