// import libreries
import { useState } from 'react';
import {View, Text, StyleSheet, Pressable, useColorScheme, Image} from 'react-native';
import { BlurView } from 'expo-blur';
import { API_URL } from '../constants/api';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import components
import { InputLogin } from '../components/InputLogin';
import logoWhite from '../assets/logoStartWhite.png';
import logoBlack from '../assets/logoStartBlack.png';
import bgDark from '../assets/bgAppDark.png'

export default function LoginContentCreator() {

const router = useRouter();
const colorScheme = useColorScheme();

const colorText = colorScheme === 'dark' ? styles.textWhite : styles.TextBlack
const bgButton = colorScheme === 'light' ? styles.bgButtonBlue : styles.bgButtonYellow

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
          <Image source={bgDark} style={styles.bgDarkImage} /> 
            <View style={styles.container}>
              <BlurView 
                intensity={80} 
                tint={colorScheme === 'dark' ? 'dark' : 'light'}
                style={styles.loginContainer}
              >
                <View style={styles.header}>
                  <Text style={[styles.title, colorText]}>Login</Text>
                  <Text style={[styles.subtitle, colorText]}>Please Sign and continue</Text>
                </View>
               <View style={styles.containerInput}>
                  <Text style={[colorText, styles.inputTitle]}>Mail</Text>
                  <InputLogin
                    value={email}
                    onChangeText={setEmail}
                    placeholder={'example@gmail.com'}
                    secureTextEntry={false}
                  />
               </View>
               <View style={styles.containerInput}>
                  <Text style={[colorText, styles.inputTitle]}>Password</Text>
                  <InputLogin 
                    value={password}
                    onChangeText={setPassword}
                    placeholder={'Entry your password'}
                    secureTextEntry={true}
                  />
               </View>
                <View style={styles.containerInput}>
                  <Text style={[colorText, styles.inputTitle]}>Identification</Text>
                  <InputLogin 
                    value={identification}
                    onChangeText={setIdentification}
                    placeholder={'Entry your identification'}
                    secureTextEntry={false}
                />
                </View>
                <Pressable 
                  style={[styles.button, bgButton]}
                  onPress={async () => {
                    const data = await loginFetch(email, password, identification)
                    console.log("Respuesta del backend:", data);  
                }}>
                  <Text style={styles.textButton}>Login</Text>
                </Pressable>
                <Pressable onPress={async () => {
                  router.push('createContentCreator')
                }}>
                  <Text style={[colorText, styles.link]}>Dont have account? Create one here</Text>
                </Pressable>
              </BlurView>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 80
  },
  header:{
    gap: 5,
    marginBottom: 10
  },
  bgDarkImage: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  imageContainer: {
    alignItems: 'center', 
    marginBottom: 30, 
  },
  image: {
    width: 175, 
    height: 175,
    marginTop: 100,
  },
  loginContainer:{
    width: '100%',
    gap: 16, 
    padding: 24,
    overflow: 'hidden',
    borderRadius: 36,
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold'
  },
  subtitle:{
    fontSize: 16,
    opacity: 0.7
  },
  textWhite:{
    color: '#F1F4F6'
  },
  TextBlack:{
    color: '#333A3F'
  },
  button:{
    padding: 10,
    alignItems: 'center',
    borderRadius: 28,
    marginInline: 50,
    borderWidth: 0.5,
    borderColor: '#fff5d3ff'
  },
  textButton:{
    fontSize: 16,
    fontWeight: 'bold'
  },
  bgButtonYellow:{
    backgroundColor: '#FFC857'
  },
  containerInput:{
    gap: 12
  },
  inputTitle:{
    fontSize: 14,
    fontWeight: 'bold'
  },
  link:{
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10
  }
})