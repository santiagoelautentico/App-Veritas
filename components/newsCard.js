import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { router } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function NewCard({ id_news, id_country, title, id_user, subtitle, created_at, body }) {
    const colorScheme = useColorScheme();

    const bgStyle = colorScheme === 'light' ? styles.bgWhite : styles.bgBlack
    const colorText = colorScheme === 'light' ? styles.textBlack : styles.textWhite

    const date = new Date(created_at);
    const formatteDate = new Intl.DateTimeFormat('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
    }).format(date);
    return (
        <TouchableOpacity key={id_news} style={[styles.container, bgStyle]} onPress={() => {
            router.push(`/news/${id_news}`)
        }}>
            <View style={styles.headerNews}>
                <Text key={id_user} style={colorText}>Name User</Text>
                <Text style={colorText}>{formatteDate}</Text>
                <Text key={id_country} style={colorText}>Country</Text>
            </View>
            <View style={styles.titleContainer}>
                <Text style={[styles.title, colorText]}>{title}</Text>
                <Text style={[styles.subtitle, colorText]}>{subtitle}</Text>
            </View>
            <View>
                <Text style={colorText}>{body}</Text>
            </View>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container:{
        marginTop: 20,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 24,
        borderRadius: 28,
    },
    bgBlack:{
        backgroundColor: '#333A3F'
    },
    textWhite: {
        color: '#F1F4F6'
    },
    headerNews:{
        flexDirection: 'row',
        gap: 1,
        justifyContent: 'space-between',
        marginBottom: 10,
        alignItems: 'center'
    },
    titleContainer:{
        marginBottom: 10,
        gap: 5
    },
    title:{
        fontSize: 21,
        fontWeight: 'bold',
        padding: 0
    },
    subtitle:{
        fontSize: 16,
    }
})