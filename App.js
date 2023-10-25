import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Dimensions, ImageBackground, View, Image, ActivityIndicator, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import useFetch from './hook/useFetch';
import { COLORS,icons, backGroundImage, weatherImages } from './constants';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  const width = Dimensions.get('window').width

  const { daysForecast, isLoading, error, refetch, currentWeather } = useFetch();
  console.log("he current ... " + isLoading);
  const dailyData = daysForecast?.list.filter((item, index) => index % 8 === 0).map(item => item);

  const Item = ({ daily }) => {
    const date = new Date(daily.dt * 1000)
    let dayName = date.toUTCString();
    dayName = dayName.split(',')[0];
    return (
      <View style={[styles.foercastView, { backgroundColor: COLORS[daily.weather[0].main] }]} >
        <Text style={{ flex: 1, color: 'white' }}>{dayName}</Text>
        <View style={{ flex: 1, alignContent: 'flex-start' }}>
          <Image source={weatherImages[daily.weather[0].main]} />
        </View>
        <Text style={{ color: 'white' }}> {Math.round(daily.main.temp_max)} &deg;</Text>
      </View>
    )
  };

  return (
    
    <View style={[styles.container, { backgroundColor: COLORS[currentWeather?.weather[0].main] }]}>
      {isLoading ? (
        <ActivityIndicator />
      ) : error ? (
        <Text>Ooops.. Coulding fetch data </Text>
      ) : (
        <View>
          <View style={styles.currentWeather}>
            <ImageBackground source={backGroundImage[currentWeather?.weather[0]['main']]} style={[styles.image, { width: width, }]}>
            
              <View style={{ marginTop: 80 }}>
                <Text style={styles.currentTemp} >
                  {Math.round(currentWeather?.main.temp)} &deg;
                </Text>
                <Text style={styles.currentCondition}>{currentWeather?.weather[0].description}</Text>
              </View>
            </ImageBackground>
          </View>

          <View style={[styles.currentWeatherDetails, { backgroundColor: COLORS[currentWeather?.weather[0].main] }]}>
            <View style={styles.tempView}>
              <Text style={{ color: "white", fontWeight: '500' }} >{Math.round(currentWeather?.main.temp_min)} &deg;</Text>
              <Text style={{ color: "white" }}>min</Text>
            </View>
            <View style={styles.tempView}>
              <Text style={{ color: "white" }}>{Math.round(currentWeather?.main.temp)}&deg;</Text>
              <Text style={{ color: "white" }}>Current</Text>
            </View>
            <View style={styles.tempView}>
              <Text style={{ color: "white" }}>{Math.round(currentWeather?.main.temp_max)} &deg;</Text>
              <Text style={{ color: "white" }}>Max</Text>
            </View>
          </View>

          <FlatList
            data={dailyData}
            renderItem={({ item }) => <Item daily={item} />}
            keyExtractor={(item, idx) => `${Object.keys(item)}-${idx}`}
            style={styles.scrollView}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor:COLORS.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  foercastView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 16,
    // margin:2,
    flex: 2
  },
  currentWeather: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: "center",

    // margin: 10,
    flex: 1.5
  },
  image: {
    flex: 1,
    resizeMode: 'center',
    // height:100
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
    padding: 10,
    marginBottom: 1,
    borderBottomColor: 'white',
    borderBottomWidth: 1

  },
  currentCondition: {
    color: "white",
    fontWeight: '300',
    fontSize: 24, alignSelf: 'center'
  },

  scrollView: {
    // paddingHorizontal: 20,
    flex: 2
  },
  tempView: {
    alignItems: 'center',
    color: 'white'
  },
  searchBtn: {
    width: 30,
    height: "20%",
    // backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin:10,
   alignSelf:'flex-end'
  },
  searchBtnImage: {
    width: "90%",
    height: "90%",
    tintColor: 'white',
  },
});
