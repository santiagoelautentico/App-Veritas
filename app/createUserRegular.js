import { View, Text, StyleSheet, Pressable } from "react-native"
import { useState } from "react"
import { useRouter } from 'expo-router';
import { API_URL } from '../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { InputLogin } from '../components/InputLogin';

export default function createUserRegular() {
    const router = useRouter();
    
    const [name_user, setName_user] = useState('')
    const [lastname, setLastname] = useState('')    
    const [username, setUsername] = useState('')    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [id_country, setCountry] = useState('')  
    
    const createAccountFetch = async (name_user, lastname, username, email, password, id_country ) => {
        await AsyncStorage.removeItem("authToken");
        try {
            const response = await fetch(`${API_URL}registerRegularUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name_user, lastname, username, email, password, id_country })
            });
            const data = await response.json();
            if (!response) {
                console.log("Login Fail", data.message); 
                console.log(name_user, lastname, username, email, password, id_country)
                return null;
            }
            console.log("Correct login", data)
            router.push("/loginRegularUser")
        } catch(error) {
            console.error("Network Error", error);
            return null;
        }
    }

    return (
        <View style={styles.container}>
            <InputLogin
                value={name_user}
                onChangeText={setName_user}
                placeholder={'Charlie'}
                secureTextEntry={false}
            />
            <InputLogin
                value={lastname}
                onChangeText={setLastname}
                placeholder={'Jhonson'}
                secureTextEntry={false}
            />
            <InputLogin
                value={username}
                onChangeText={setUsername}
                placeholder={'Jhonson'}
                secureTextEntry={false}
            />
            <InputLogin
                value={email}
                onChangeText={setEmail}
                placeholder={'charlieJhonson@gmail.com'}
                secureTextEntry={false}
            />
             <InputLogin
                value={password}
                onChangeText={setPassword}
                placeholder={'Insert your password'}
                secureTextEntry={true}
            />
            <InputLogin
                value={id_country}
                onChangeText={setCountry}
                placeholder={'insert 1 for now'}
                secureTextEntry={false}
            />
            <Pressable onPress={async () => {
                const data = await createAccountFetch(name_user, lastname, username, email, password, id_country)
                console.log('response from server', data)
            }}>
                <Text>Create Acount</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // rojo sólido
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
});