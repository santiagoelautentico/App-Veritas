import { View, Text, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { API_URL } from "../constants/api";
import AsyncStorage from '@react-native-async-storage/async-storage'; // ❌ FALTA ESTE IMPORT
import { Screen } from '../components/Screen'
import { InputLogin } from '../components/InputLogin'

export default function createNews() {
    //uses States
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [body, setBody] = useState('');
    const [id_category, setCategory] = useState(0);
    const [id_country, setCountry] = useState(0);
    const [sources, setSources] = useState('')
    const [userData, setUser] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const dataUser = await AsyncStorage.getItem('dataUser');
            const dataUserParse = JSON.parse(dataUser);
            const user = dataUserParse.user.user
            setUser(user);
            console.log('USER PROFILE IS: ', user); 
        };
        fetchData();
    }, []);
    const createNew = async (title, subtitle, body, id_country, id_category, sources) => { 
        const id_user = userData?.id_user;

        if (!id_user) {
            console.log("No user data available");
            return null;
        }

        try {
            const response = await fetch(`${API_URL}news/createNew`, {
                method: 'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({title, subtitle, body, id_country, id_category, id_user, sources})
            });
            const data = await response.json();
            if(!response.ok){ 
                console.log("Create News Fail", data.message); 
                console.log(title, subtitle, body, id_country, id_category, id_user, sources)
                return null;
            }
            console.log("News Created", data); 
            return data; 

        } catch(error) {
            console.error("Network Error", error);
            return null;
        }
    }

    return (
       <Screen>
            <InputLogin
                value={title}
                onChangeText={setTitle}
                placeholder={'Add a Title'}
                secureTextEntry={false}
            />
            <InputLogin
                value={subtitle}
                onChangeText={setSubtitle}
                placeholder={'Add a subtitle'}
                secureTextEntry={false}
            />
            <InputLogin
                value={body}
                onChangeText={setBody}
                placeholder={'Add body'} 
                secureTextEntry={false}
            />
            <InputLogin
                value={id_country.toString()} 
                onChangeText={(text) => setCountry(Number(text))} 
                placeholder={'put a 1'}
                secureTextEntry={false}
                keyboardType="numeric" 
            />
            <InputLogin
                value={id_category.toString()} 
                onChangeText={(text) => setCategory(Number(text))} 
                placeholder={'put a 1'}
                secureTextEntry={false}
                keyboardType="numeric" 
            />
            <InputLogin
                value={sources}
                onChangeText={setSources}
                placeholder={'Add a sources'}
                secureTextEntry={false}
            />
            <Pressable 
                onPress={async () => {
                    const data = await createNew(title, subtitle, body, id_country, id_category, sources)
                    console.log('response from server', data)
                }}
            >
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>
                    Create News
                </Text>
            </Pressable>
       </Screen>
    )
}