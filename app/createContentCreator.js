import { Text, View, StyleSheet, Pressable } from 'react-native'
import { useState } from 'react'
import { API_URL } from '../constants/api';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { InputLogin } from '../components/InputLogin';

export default function createContentCreator() {
    const router = useRouter();
    //Uses States
    const [name_user, setNameUser] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [id_country, setIdCountry] = useState('');
    const [ocupation, setOcupation] = useState('');
    const [company, setCompany] = useState('');
    const [type_of_journalist, setTypeOfJournalist] = useState('');
    const [identification, setIdentification] = useState('');
    const [biography, setBiography] = useState('');

    const createCreatorFetch = async (name_user, lastname, username, email, password, 
    id_country, ocupation, company, type_of_journalist, identification, biography) => {
            await AsyncStorage.removeItem("authToken");
            try {
                const response = await fetch(`${API_URL}registerContentCreator`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name_user, lastname, username, email, password, id_country, ocupation, company, type_of_journalist, identification, biography })
                });
                const data = await response.json();
                if(!response){
                    console.log("Login Fail", data.message); 
                    console.log(name_user, lastname, username, email, password, id_country, ocupation, company, type_of_journalist, identification, biography)
                    return null;
                }
                console.log("User Created", data);
                router.push("/loginContentCreator")
            } catch {
                console.error("Network Error", error);
                return null;
            }
        }
    return (
        <View>
            <InputLogin
                value={name_user}
                onChangeText={setNameUser}
                placeholder={'Charlie'}
                secureTextEntry={false}
            />
            <InputLogin
                value={lastname}
                onChangeText={setLastname}
                placeholder={'Jackson'}
                secureTextEntry={false}
            />
            <InputLogin
                value={username}
                onChangeText={setUsername}
                placeholder={'CharlieJackson'}
                secureTextEntry={false}
            />
            <InputLogin
                value={email}
                onChangeText={setEmail}
                placeholder={'CJackson@gmail.com'}
                secureTextEntry={false}
            />
            <InputLogin
                value={id_country}
                onChangeText={setIdCountry}
                placeholder={'for the momento put 1'}
                secureTextEntry={false}
            />
            <InputLogin
                value={ocupation}
                onChangeText={setOcupation}
                placeholder={'Freelance Journalist'}
                secureTextEntry={false}
            />
            <InputLogin
                value={company}
                onChangeText={setCompany}
                placeholder={'Charlie Jackson Journal'}
                secureTextEntry={false}
            />
            <InputLogin
                value={type_of_journalist}
                onChangeText={setTypeOfJournalist}
                placeholder={'Policy Journalist'}
                secureTextEntry={false}
            />
            <InputLogin
                value={identification}
                onChangeText={setIdentification}
                placeholder={'Put your identification'}
                secureTextEntry={false}
            />
            <InputLogin
                value={biography}
                onChangeText={setBiography}
                placeholder={'Add a biography'}
                secureTextEntry={false}
            />
            <InputLogin
                value={password}
                onChangeText={setPassword}
                placeholder={'Add a password'}
                secureTextEntry={true}
            />
            <Pressable onPress={async () => {
                const data = await createCreatorFetch(name_user, lastname, username, email, password, 
                id_country, ocupation, company, type_of_journalist, identification, biography)
                console.log('response from server', data)
            }}>
                <Text>Create Acount</Text>
            </Pressable>
        </View>
    )
}