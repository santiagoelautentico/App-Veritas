import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { router } from 'expo-router';
export default function NewCard({ id_news, id_country, title, id_user, subtitle, created_at, body }) {

    const date = new Date(created_at);

    const formatteDate = new Intl.DateTimeFormat('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
    }).format(date);

    console.log('id n');
    

    return (
        <TouchableOpacity key={id_news} style={styles.container} onPress={() => {
            router.push(`/news/${id_news}`)
        }}>
            <View style={styles.headerNews}>
                <Text key={id_user}>Name User</Text>
                <Text>{formatteDate}</Text>
                <Text key={id_country}>Country</Text>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
            <View>
                <Text>{body}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        marginBottom: 20,
        backgroundColor: '#EEEEEE',
        padding: 24,
        borderRadius: 28,
    },
    headerNews:{
        flex: 1,
        flexDirection: 'row',
        gap: 1,
        justifyContent: 'space-between',
        marginBottom: 10,
        alignItems: 'center'
    },
    titleContainer:{
        flex: 1,
        gap: 5,
        marginBottom: 10
    },
    title:{
        fontSize: 21,
        fontWeight: 'bold'
    },
    subtitle:{
        fontSize: 16,
        color: '#373A40'
    }
})