//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView, SafeAreaView,TouchableOpacity,Image } from 'react-native';
import { Stack, useRouter } from "expo-router";
import { COLORS,icons, backGroundImage, weatherImages } from '../constants';
import App from '../App';
import * as Location from 'expo-location';

// create a component
const Home = () => {
    const router = useRouter()

    
    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    headerShadowVisible: false,
                    headerTransparent:true,
                    headerShown:true,
                    headerStyle: { backgroundColor:'transparent' },
                    headerShadowVisible: false,
               
                    headerLeft:()=>(
                        <></>
                    ),
                    headerRight: () => (
                        <TouchableOpacity style={styles.searchBtn} 
                            onPress={()=> router.push(`/search/`)}
                        >
                            <Image
                                source={icons.search}
                                resizeMode='contain'
                                style={styles.searchBtnImage}
                            />
                        </TouchableOpacity>
                    ),
                    headerTitle: "",
                }}
            />
            <View style={{flex:1}}>
            <App/>
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
    },
    searchBtn: {
        width: 30,
        height: "100%",
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginVertical:10,
        padding:5,
      },
      searchBtnImage: {
        width: "100%",
        height: "100%",
        tintColor: COLORS.backgroundColor
      },
});

//make this component available to the app
export default Home;
