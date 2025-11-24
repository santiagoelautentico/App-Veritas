import { Pressable, Text, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';

export default function CloseSession() {

    const router = useRouter()

    return (
        <Pressable
            style={styles.button}
            onPress={async () => {
                await AsyncStorage.removeItem("authToken");
                await AsyncStorage.removeItem("dataUser");
                const token = await AsyncStorage.getItem("authToken");
                const dataUser = await AsyncStorage.getItem("dataUser");
                console.log('Token after deleted:', token);
                console.log('User data after deleted:', dataUser);
                router.push('/')
        }}
        >
            <Entypo name="log-out" size={16} color="white" />
            <Text style={styles.text}>Close Session</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#0F4C81',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 6,
        alignSelf: 'flex-start' ,
        flexDirection: 'row',
        gap: 5
    },
    text:{
        color: '#fff'
    }
})