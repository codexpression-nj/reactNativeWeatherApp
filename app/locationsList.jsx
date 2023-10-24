//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, FlatList,Image, TouchableOpacity, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, icons } from '../constants';

// create a component
const LocationList = () => {
   const apiKeyWeather = process.env.EXPO_PUBLIC_API_KEY_WEATHER
    const [places, setplaces] = useState([])

    const handleSearch = async () => {
        // let loc = params.id
        let loc = useLocalSearchParams();
        await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lng}&appid=${apiKeyWeather}&units=metric`,
        )
            .then(res => res.json())
            .then((res) => {
                setWeather(res)
            })
            .catch(err => console.log(err));
            
    }

    const fetchPlaceKey  = async () =>{
        try {
            //  AsyncStorage.clear()
            const value = await AsyncStorage.getItem('savedLocation');
             value != null ? JSON.parse(value) : null;
             let newValue = value != null ? JSON.parse(value) : null;
             setplaces(newValue)
             console.log(places);
            // console.log(value);


        } catch (e) {
            // error reading value
            console.log(e);
        }
    }

    useEffect(() => {
       fetchPlaceKey()
    }, []);
    return (
        <SafeAreaView style={styles.container}>

            <Stack.Screen
                options={{
                    headerTransparent: true,
                    headerShown: true,
                    headerShadowVisible: false,
                    headerBlurEffect: 'extraLight',
                    headerTitle: "Your Locations",
                }}

            />
            {/* <View sty>

            </View> */}
            {/* <ScrollView> */}
                <View style={{ marginTop: 100 }} >
                    <FlatList
                        data={places}
                        contentInset={{ padding: 12 }}

                        renderItem={({ item }) =>
                            <TouchableOpacity style={styles.savedLocationView} >
                                <Text style={styles.cityName}>{item}</Text>
                            </TouchableOpacity>}

                    />
                </View>
            {/* </ScrollView> */}
        </SafeAreaView>

    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: COLORS.backgroundColor,
    },
    savedLocationView: {
        flex: 1,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 16,
        justifyContent: 'space-between',
        padding: 5,
        margin: 5
    },
    cityName: {
        fontSize: 24,
        fontWeight: '200',
        // color:'white'
    },
    searchBtn: {
        width: 30,
        height: "100%",
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        padding: 5,
        alignSelf: 'flex-end'
    },
    searchBtnImage: {
        width: "100%",
        height: "100%",
        tintColor: 'black',
    },
});

//make this component available to the app
export default LocationList;
