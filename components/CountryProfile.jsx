import { View, Text, useColorScheme, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL, URL_NETWORK } from "../constants/api";

export default function CountryProfile() {
  const colorScheme = useColorScheme();

  const colorText =
    colorScheme === "light" ? styles.textBlack : styles.textWhite;

  const [countries, setCountries] = useState([]);
  const [userCountryName, setUserCountryName] = useState("");
  const fetchCountries = async () => {
    try {
      const response = await fetch(`${URL_NETWORK}countries`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!response.ok) {
        console.log("Fetch Fail", data.message);
        return null;
      }
      setCountries(data.news);
    } catch (error) {
      console.error("Network Error", error);
      return null;
    }
  };

  const getUserCountry = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("dataUser");
      if (!userDataString) return;
      const userData = JSON.parse(userDataString);
      console.log("User data parsed:", userData);
      const userCountryId = Number(userData.user.user.id_country);
      console.log("User country id:", userCountryId);
      const country = countries.find(
        (c) => Number(c.id_country) === userCountryId
      );
      if (country) {
        setUserCountryName(country.name_country);
      } else {
        console.log("No se encontró el país con id:", userCountryId);
      }
    } catch (error) {
      console.error("Error leyendo usuario", error);
    }
  };
  useEffect(() => {
    fetchCountries();
  }, []);
  useEffect(() => {
    if (countries.length > 0) {
      getUserCountry();
    }
  }, [countries]);
  return <Text style={colorText}>Country: {userCountryName}</Text>;
}
const styles = StyleSheet.create({
  textWhite: {
    color: "#F1F4F6",
  },
  textBlack: {
    color: "#121212",
  },
});
