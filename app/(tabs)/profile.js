import {View, Text, StyleSheet, Pressable, FlatList} from 'react-native'
import { useEffect, useState } from 'react';
import CloseSession from '../../components/CloseSession'
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountryProfile from '../../components/CountryProfile'
import { useRouter } from 'expo-router';
import { API_URL } from '../../constants/api';
import NewCard from '../../components/newsCard';

export default function profile() {

const router = useRouter();

const [userData, setUser] = useState('')
const [news, setNews] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const dataUser = await AsyncStorage.getItem('dataUser');
            const dataUserParse = JSON.parse(dataUser);
            const user = dataUserParse.user.user
            setUser(user);       
            console.log('USER PROFILE IS: ', user.id_user)     
        };
        fetchData();
    }, []);

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
            const response = await fetch(`${API_URL}news/profileNews/${userData.id_user}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            // console.log('data recibida del API:', data); // Log de lo que llega
            setNews(data.news);;
        } catch (error) {
            console.error("Error to get News", error);
        }
    };

    useEffect(() => {
        haveToken();
        if (userData?.id_user) {
            console.log('Llamando getNews con id:', userData.id_user);
            console.log('Estado de news actualizado:', news);
            getNews();
        }   
    }, [userData]); // Se ejecuta cada vez que userData cambia

    useEffect(() => {
        console.log('Estado de news actualizado:', news);
    }, [news]); // Solo para hacer log cuando news cambie



    return (
        <View style={styles.container}>
            <View style={styles.buttomClose}>
                <CloseSession />
            </View>
            <View>
                <CountryProfile />
            </View>
            <View>
                <Text style={styles.title}>{userData?.username}</Text>
                <View style={styles.detailsContainer}>
                    <Text>Ocupation: {userData?.ocupation}</Text>
                    <Text>-</Text>
                    <Text>Type of journalist: {userData?.type_of_journalist}</Text>
                </View>
                <View style={styles.bioContainer}>
                    <Text style={styles.subtitle}>Biography</Text>
                    <Text>{userData?.biography}</Text>
                </View>
            </View>
            
            <Text style={styles.subtitle}>Posts</Text>
            
            {/* FlatList necesita flex para ocupar el espacio disponible */}
            <FlatList
                data={news}
                style={styles.flatList}
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
            
            {userData?.status_account === 1 && (
                <Pressable onPress={() => router.push("createNew")} style={styles.buttom}>
                    <Text style={styles.textB}>Create a New</Text>
                </Pressable>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    buttomClose:{
        marginBottom: 20
    },
    container: {
        padding: 20,
        height: '100%',
        flex: 1 // Importante: permite que el contenedor use flexbox
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 2
    },
    detailsContainer: {
        flexDirection: 'row',
        gap: 2,
        marginBottom: 10
    },
    subtitle:{
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10 // Espacio antes del FlatList
    },
    bioContainer:{
        gap: 5,
        marginBottom: 10
    },
    flatList: {
        flex: 1, // Permite que el FlatList ocupe el espacio restante
        marginBottom: 80 // Espacio para el botón
    },
    contentContainer: {
        paddingBottom: 20 // Padding interno del FlatList
    },
    buttom:{
        position: 'absolute',
        backgroundColor: '#0F4C81',
        paddingVertical: 12,
        borderRadius: 6,
        left: 20,
        bottom: 20,
        width: '90%', // Cambiado de 100% para que respete el padding
    },
    textB:{
        color: '#fff',
        textAlign: 'center'
    }
})