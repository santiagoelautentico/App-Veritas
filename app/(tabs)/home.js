import { FlatList, StyleSheet, View, Text } from 'react-native'
import { useState, useEffect } from 'react';
import { API_URL } from '../../constants/api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Screen } from '../../components/Screen'

//Import Components
import NewCard from '../../components/newsCard';

export default function Home(){
    
    const router = useRouter();
    
    const [news, setNews] = useState([]);

    const haveToken = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            console.log("Token en home:", token);
            if (!token || token === 'undefined') {
                setTimeout(() => {
                    router.push('loginRegularUser');
                }, 500);
            }
        } catch (error) {
            console.error("Error leyendo token", error);
        }
    };

    const getNews = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken')
            console.log("token guardado ahora en news", token);
            const response = await fetch(`${API_URL}news`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            setNews(data.news);
            console.log("All the news from data", data);
            console.log("Cantidad de noticias:", data.news?.length);
            
        } catch (error) {
            console.error("Error to get News", error);
        }
    };

    useEffect(() => {
        haveToken();
        getNews()
    }, []);

    return (
        <Screen>
            <FlatList
                data={news}
                contentContainerStyle={styles.contentContainer}
                keyExtractor={(item) => item.id_news.toString()}
                renderItem={({ item }) => (
                    <NewCard
                        id_news={item.id_news}
                        title={item.title}
                        id_country={item.id_country}
                        subtitle={item.subtitle}
                        body={item.body}
                        created_at={item.created_at}
                    />
                )}
            />
        </Screen>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 20,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});