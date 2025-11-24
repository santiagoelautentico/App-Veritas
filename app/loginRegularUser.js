// Import Libreries
import { useState } from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import { API_URL } from '../constants/api';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import Components
import { BackButton } from '../components/BackButton';
import { InputLogin } from '../components/InputLogin';
export default function LoginRegularUser() {


    const router = useRouter();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginFetch = async (email, password) => {
    await AsyncStorage.removeItem("authToken");

    try {
        const response = await fetch(`${API_URL}loginUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        const token = data.token;

        if (!response.ok) {
        console.log("Login Fail", data.message);
        return null;
        }

        if (!token || token === 'undefined') {
        console.log("Token inválido");
        return null;
        }

        await AsyncStorage.setItem("authToken", token);
        await AsyncStorage.setItem("dataUser", JSON.stringify(data));

        console.log("Correct Login", data);
        console.log("Token guardado", token);

        router.push("/home");
        return data;
    } catch (error) {
        console.error("Network Error", error);
        return null;
    }
    };
    return (
        <>
            <View style={styles.container}>
                <View>
                    <Text>Login</Text>
                    <Text>Please Sign and continue</Text>
                </View>
                <View>
                    <InputLogin
                    value={email}
                    onChangeText={setEmail}
                    placeholder={'example@gmail.com'}
                    secureTextEntry={false}
                    />
                    <InputLogin 
                    value={password}
                    onChangeText={setPassword}
                    placeholder={'Entry your password'}
                    secureTextEntry={true}
                    />
                </View>
                <Pressable onPress={async () => {
                    const data = await loginFetch(email, password); // 👈 ejecutás la función con tus estados
                    console.log("Respuesta del backend:", data);    // 👈 usás el resultado
                 }}>
                    <Text>Login</Text>
                </Pressable>
                <Pressable onPress={async () => {
                    router.push('/createUserRegular')
                }}>
                    <Text>No tengo una cuenta</Text>
                </Pressable>
            </View>
            <View style={styles.containerBack}>
                <BackButton href='/' />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // rojo sólido
    minWidth: '100%',
    minHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
    containerBack:{
    position: 'absolute',
    left: 20,
    top: 60
  }
})