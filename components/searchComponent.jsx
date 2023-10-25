 //import liraries
 import React, { Component, useState, useEffect } from 'react';
 import { View, Text, Image, Dimensions, Card, ImageBackground, TextInput, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
 import { Stack, useRouter } from "expo-router";
 import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
 import { FlatList } from 'react-native-gesture-handler';
 import useFetch from '../hook/useFetch';
 // import { Button,Card} from 'react-native-paper';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import { COLORS, icons, backGroundImage, weatherImages, SIZES } from '../constants';
 import { Ionicons } from '@expo/vector-icons';
 import { FontAwesome } from '@expo/vector-icons';
 import { AntDesign } from '@expo/vector-icons';
// create a component
const SearchComponent = () => {
    
    const width = Dimensions.get('window').width
    const height = Dimensions.get('screen').height
    const placesApiKey = process.env.EXPO_PUBLIC_API_KEY_PLACES;
    const router = useRouter()
    const [errorMsg, setErrorMsg] = useState(null);
    const [newLocation, setNewLocation] = useState(null)
    const [savedLocations, setSavedLocation] = useState([])
    const [weather, setWeather] = useState(null)
    const apiKeyWeather = process.env.EXPO_PUBLIC_API_KEY_WEATHER

    const handleSaveLocation = async (location) => {
       
        setSavedLocation([...savedLocations, location.place_id])
        try {
            const jsonValue = JSON.stringify(savedLocations);
            await AsyncStorage.setItem('savedLocation', jsonValue
            ).then(console.log('saved'));
        } catch (error) {
            // Error saving data
            console.log(error);
        }
    };

    
    const fetchCityweather = async (loc) => {
        await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lng}&appid=${apiKeyWeather}&units=metric`,
        )
            .then(res => res.json())
            .then((res) => {
                console.log(res);
                setWeather(res)
            })
            .catch(err => setErrorMsg(err));
    }
    //Collect all previous saved locations
    const fetchPlaceKey  = async () =>{
       
        try {
            //  AsyncStorage.clear()
            const value = await AsyncStorage.getItem('savedLocation');
             value != null ? JSON.parse(value) : null
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
            {weather ?
                <ScrollView style={{ marginTop: 60, borderRadius: SIZES.medium, flex: 1,  backgroundColor: COLORS[weather?.weather[0].main] }}>
                    <View>
                        <View style={styles.currentWeather}>
                            <ImageBackground source={backGroundImage[weather?.weather[0]['main']]} style={[styles.image, { width: width, height: Dimensions.get("screen").height / 2 }]}>
                                
                                <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: "center" }}>

                                    <Text style={styles.cityName}>{weather.name}</Text>

                                    <TouchableOpacity style={{ flexDirection: "row", alignItems: 'center' }}

                                        onPress={() => {
                                            let place_id = newLocation.place_id
                                            console.log(place_id);
                                            router.push(`/place-details-view/${place_id}`
                                            );
                                        }}
                                    >
                                        <AntDesign name="infocirlceo" size={20} color="white" />
                                    </TouchableOpacity>
                                </View>

                                <View style={{ marginTop: 10 }}>
                                    <Text style={styles.currentTemp}>
                                        {Math.round(weather?.main.temp)} &deg;
                                    </Text>
                                    <Text style={styles.currentCondition}>{weather?.weather[0].main}</Text>
                                </View>
                                
                            </ImageBackground>
                            
                        </View>

                    </View >
                    <View style={[styles.currentWeatherDetails, { backgroundColor: COLORS[weather?.weather[0].main], }]}>
                        <View style={styles.tempView}>
                            <Text style={{ color: "white", fontWeight: '500' }} >{Math.round(weather?.main.temp_min)} &deg;</Text>
                            <Text style={{ color: "white" }}>min</Text>
                        </View>
                        <View style={styles.tempView}>
                            <Text style={{ color: "white" }}>{Math.round(weather?.main.temp)} &deg;</Text>
                            <Text style={{ color: "white" }}>Current</Text>
                        </View>
                        <View style={styles.tempView}>
                            <Text style={{ color: "white" }}>{Math.round(weather?.main.temp_max)} &deg;</Text>
                            <Text style={{ color: "white" }}>Max</Text>
                        </View>

                    </View>
                    <View style={{ backgroundColor: COLORS[weather?.weather[0].main], justifyContent: 'space-between', flexDirection: 'row', margin: 5 }}>
                        <View style={[styles.tempView, { backgroundColor: 'rgba(52, 52, 52, 0.1)',  borderRadius: 16, height: 60, flex: 1, margin: 5, padding: 5 }]}>
                            <Text style={{ color: "white", marginBottom: 10 }}>{weather.main.humidity}%</Text>
                            <Text style={{ color: "white" }}>Humidity</Text>

                        </View>
                        <View style={[styles.tempView, { backgroundColor: 'rgba(52, 52, 52, 0.1)', borderRadius: 16, height: 60, flex: 1, margin: 5, padding: 5 }]}>
                            <Text style={{ color: "white", marginBottom: 10 }}>{Math.round(weather.main.feels_like)} &deg;</Text>
                            <Text style={{ color: "white" }}> Feels Like</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={{ alignSelf: "center", alignItems: 'center', padding: 10,backgroundColor: COLORS.lightWhite,width:'95%',borderRadius:SIZES.medium }}
                                    onPress={() => {
                                        handleSaveLocation(newLocation)
                                    }}
                                >
                                    <Text >SAVE</Text>
                                </TouchableOpacity >
                </ScrollView>

                : null

            }
            <View style={{ position: 'absolute', padding: 10, top: 60, width: width, }}>
                <GooglePlacesAutocomplete
                    placeholder="Type a location name"
                    fetchDetails={true}
                    query={{ key:  placesApiKey}}
                    onPress={(data, details = null) => {
                        setNewLocation(details)
                        fetchCityweather(details.geometry.location)
                    }}
                    onFail={error => console.log(error)}
                    onNotFound={() => console.log('no results')}
                    styles={{
                        textInputContainer: {
                            width: '100%',
                            marginTop: 10,
                            alignSelf: 'center'
                        },
                        textInput: {
                            color: '#5d5d5d',
                            fontSize: 16,
                            width: 100,
                        },
                        predefinedPlacesDescription: {
                            color: '#1faadb',
                        },
                    }}
                />
            </View>


        </SafeAreaView>
    );

};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    container: {
        flex: 1,
        paddingTop: 80,
        padding: 10,
        backgroundColor: COLORS.backgroundColor,
    },

    saveLocationList: {

    },
    currentWeather: {
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: "center",
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        alignItems: 'center'
    },

    currentTemp: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 40,
        alignSelf: 'center'
    },
    currentWeatherDetails: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        marginBottom: 1,
        borderBottomColor: 'white',
        borderBottomWidth: 1,

    },
    currentCondition: {
        color: COLORS.lightWhite,
        fontWeight: '300',
        fontSize: 24,
         alignSelf: 'center'
    },

    cityName: {
        fontWeight: '600',
        color: COLORS.lightWhite,
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical:20
    },
    temp: {
        fontSize: 40,
        color: COLORS.lightWhite,
        fontWeight: '300'

    },
    tempView: {
        alignItems: 'center',
      },
});

//make this component available to the app
export default SearchComponent;
