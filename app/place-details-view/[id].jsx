//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Stack, useRouter, useLocalSearchParams, useGlobalSearchParams } from 'expo-router'
import { COLORS, SIZES } from '../../constants';

// create a component
const PlaceDetailCard = () => {
    const params = useLocalSearchParams();
    const place_id = params.id
    const placeId = place_id;
    const apiKey = process.env.EXPO_PUBLIC_API_KEY_PLACES;
    const [placeDetails, setPlaceDetails] = useState([]);
    const [noData,setNoData] = useState()
    const [error,setError] = useState()
    useEffect(() => {
        const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 'OK') {
                    setPlaceDetails(data.result);
                    console.log(data.result);
                } else {
                    console.error('Error fetching place details:', data.status);
                }
            })
            .catch((error) => {
                console.error('Error fetching place details:', error);
            });
    }, []);
    const getPlaceCategories = () => {
        if (placeDetails.types && placeDetails.types.length > 0) {
            return placeDetails.types.join(', ');
        }
        return 'No categories available'; 
    };
    return (
        <SafeAreaView style={styles.container}>

            <Stack.Screen
                options={{
                    headerTransparent: true,
                    headerShown: true,
                    headerShadowVisible: false,
                    headerBlurEffect: 'extraLight',


                    headerTitle: "",
                }}
            />
            <View style={{ marginTop: 60 }}>

                <ScrollView >
                    <View style={styles.detailsContainer}>
                        <Text style={styles.placeName}>{placeDetails.name}</Text>
                        <View style={styles.contentView}>
                            <Text style={styles.textHeader}>Address</Text>
                            <Text style={styles.context}> {placeDetails.formatted_address}</Text>
                        </View>
                        <View style={styles.contentView}>
                            <Text style={styles.textHeader}>Phonenumber</Text>
                            <Text  style={styles.context}>{placeDetails.formatted_phone_number}</Text>
                        </View>
                        <View style={styles.contentView}>
                            <Text style={styles.textHeader}>Rating</Text>
                            <Text  style={styles.context}>{placeDetails.rating}</Text>
                        </View>
                        <View style={styles.contentView}>
                            <Text style={styles.textHeader}>
                                Place Categories:
                            </Text>
                            <Text  style={styles.context}>
                                {getPlaceCategories()}
                            </Text>
                        </View>

                        {/* get place photos if available  */}
                        {placeDetails.photos && placeDetails.photos.length > 0 ? (
                            <ScrollView horizontal>
                                {placeDetails.photos.map((photo, index) => (
                                    <Image
                                        key={index}
                                        source={{
                                            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${apiKey}`,
                                        }}
                                        style={styles.placePhoto}
                                    />
                                ))}
                            </ScrollView>
                        ) : (
                            <Text style={styles.notAvailableText}>Photos: Not available</Text>
                        )
                        }

                    </View>
                </ScrollView>
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
        backgroundColor: COLORS.backgroundColor,
        padding: SIZES.medium
    },
    contentView: {
        width: '100%',
        marginTop: SIZES.medium
    },
    scrollViewContent: {
        alignItems: 'center',
        justifyContent: 'center',

    },
    detailsContainer: {
        marginBottom: 20,
    },
    placeName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.lightWhite
    }, placePhoto: {
        marginTop: SIZES.medium,
        width: 300,
        height: 200,
        borderRadius: SIZES.medium,
        marginRight: 10, // Add spacing between photos
    },
    textHeader: {
        marginVertical: 10,
        fontWeight: '600',
        color:COLORS.lightWhite
    },
    context:{
        fontWeight:'300',
        color:COLORS.lightWhite
    }
});

//make this component available to the app
export default PlaceDetailCard;
