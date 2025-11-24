import {View, Text, StyleSheet, Pressable} from 'react-native'
import { useEffect, useState } from 'react';
import CloseSession from '../../components/CloseSession'
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountryProfile from '../../components/CountryProfile'
import { useRouter } from 'expo-router';

export default function profile() {

const router = useRouter();

const [userData, setUser] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const dataUser = await AsyncStorage.getItem('dataUser');
            const dataUserParse = JSON.parse(dataUser);
            const user = dataUserParse.user.user
            setUser(user);

            console.log('USER PROFILE IS: ', userData);
            
        };
        fetchData();
    }, []);


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
            <View>
                <Text style={styles.subtitle}>Posts</Text>
            </View>
         {
            userData?.status_account === 1 && 
            (
                <Pressable onPress={() => router.push("createNew")} style={styles.buttom}>
                    <Text style={styles.textB}>Create a New</Text>
                </Pressable>
            )
        }
   
        </View>
    )
}

const styles = StyleSheet.create({
    buttomClose:{
        marginBottom: 20
    },
    container: {
        padding: 20,
        height: '100%'
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
        fontWeight: 'bold'
    },
    bioContainer:{
        gap: 5,
        marginBottom: 10
    },
    buttom:{
        position: 'absolute',
        backgroundColor: '#0F4C81',
        paddingVertical: 12,
        borderRadius: 6,
        left: 20,
        bottom: 20,
        width: '100%',
    },
    textB:{
        color: '#fff',
        textAlign: 'center'
    }
})