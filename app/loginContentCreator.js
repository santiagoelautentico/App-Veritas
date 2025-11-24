// import libreries
import { useState } from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import { API_URL } from '../constants/api';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import components
import { BackButton } from '../components/BackButton';
import { InputLogin } from '../components/InputLogin';

export default function LoginContentCreator() {

const router = useRouter();

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [identification, setIdentification] = useState('')

const loginFetch = async (email, password, identification) => {
  await AsyncStorage.removeItem("authToken");

  try {
    const response = await fetch(`${API_URL}loginUserCreator`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password, identification })
    });
    const data = await response.json();
    const token = data.token

    if(!response) {
      console.log("Login Fail", data.message); 
      console.log(email, password, identification)
      return null;
    }
    await AsyncStorage.setItem("dataUser", JSON.stringify(data));
    await AsyncStorage.setItem("authToken", token)
    
    console.log("Correct login", data, "token: ", token)

    router.push("/home")
  } catch(error) {
    console.error("Network Error", error);
    return null;
  }
}

    return (
        <>
            <View style={styles.container}>
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
                  <InputLogin 
                    value={identification}
                    onChangeText={setIdentification}
                    placeholder={'Entry your identification'}
                    secureTextEntry={false}
                    />
             <Pressable onPress={async () => {
                const data = await loginFetch(email, password, identification)
                console.log("Respuesta del backend:", data);  
              }}>
                <Text>Login</Text>
              </Pressable>
              <Pressable onPress={async () => {
                router.push('createContentCreator')
              }}>
                <Text>Dont have account? Create one here</Text>
              </Pressable>
            </View>
        </>
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
  containerBack:{
    position: 'absolute',
    left: 20,
    top: 60
  }
})