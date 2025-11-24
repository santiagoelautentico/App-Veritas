//Import Libraries
import { useEffect } from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { jwtDecode } from "jwt-decode";
// Import Images
import logoWhite from '../assets/logoStartWhite.png';
import logoBlack from '../assets/logoStartBlack.png';

// Import Components
import { PrimaryButton } from '../components/PrimaryButton.js';
import { SecundaryButton } from '../components/SecundaryButton.js';

export default function Index() {

  const router = useRouter();

   useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("authToken");
      console.log('token in the begginin: ', token);
      
      if (!token) {
        return null
      }
      if (token) {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000; // en segundos
        if (decoded.exp < now) {
          console.log("Token expirado");
        } else {
          console.log("Token válido");
          router.push("/home");
        }
      }
    };

    checkToken();
  }, []);

    return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={logoBlack} style={styles.image} />
                </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Welcome to Veritas App</Text>
                        <Text style={styles.subtitle}>What type of User are you?</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton title="Regular User" href='/loginRegularUser' />
                        <SecundaryButton title="Content Creator" href='/loginContentCreator' />
                    </View>
            </View>
        );
    }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // rojo sólido
    width: '100%',
  },
  textContainer:{
    marginTop: '650',
    paddingInline: '30',
  },
  imageContainer: {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: [{ translateX: -85 }, { translateY: -85 }],
  },
  image: {
    width: 175,
    height: 175,

  },
  title: {
    color: 'black', // ahora sí afecta al texto
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingInline: '30',
    gap: 24,
    flexWrap: 'wrap',
    marginTop: 20,
  }
  
})