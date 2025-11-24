import {View, Text, StyleSheet } from 'react-native'
import {useEffect, useState} from 'react'
import { useLocalSearchParams } from 'expo-router'
import { API_URL } from '../../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackButton } from '../../components/BackButton';


export default function DetailNews() {

    //consts
    const params = useLocalSearchParams();
    const idNews = params.id_news
    const [newsData, setNewsData] = useState([]);

     const haveToken = async () => {
        const token = await AsyncStorage.getItem('authToken')
        if (!token){
            router.push('loginRegularUser')
        }
    }

    const getNews = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken')
            console.log("token guardado ahora en news", token);
            const response = await fetch(`${API_URL}news/${idNews}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            setNewsData(data.news[0]);
        } catch (error) {
            console.error("Error to get News", error);
        }
    };

    useEffect(() => {
        getNews();
    }, [])


    return(
        <View style={styles.container}>
            <BackButton href='home' />
            <View style={styles.header}>
                <Text style={styles.title}>{newsData.title}</Text>
                <Text style={styles.subtitle}>{newsData.subtitle}</Text>
            </View>
            <Text>{newsData.body}</Text>
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingInline: 20,
        paddingBlock: 70,
        gap: 20
    },
    header:{
        gap: 5
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