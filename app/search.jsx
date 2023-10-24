//import liraries
import React, { Component } from 'react';
import { View, Text,Dimensions, StyleSheet,ScrollView, SafeAreaView,TouchableOpacity,Image } from 'react-native';
import { COLORS, icons } from '../constants';
import { Stack ,useRouter} from 'expo-router';
import TestSearch from '../components/searchComponent';
import SearchComponent from '../components/searchComponent';

// create a component
const Search = () => {
    const width = Dimensions.get('window').width
    const height = Dimensions.get('screen').height
    const router = useRouter()

    return (
        <SafeAreaView style={[styles.container]}>
        <Stack.Screen
            options={{
                headerShadowVisible: false,
                headerTransparent:true,
                headerShown:true,
                headerStyle: { backgroundColor:'transparent' },
                headerShadowVisible: false,
                headerTitle: "Search",
           
                headerRight: () => (
                    <TouchableOpacity style={styles.searchBtn} 
                        onPress={()=> router.push(`/locationsList/`)}
                    >
                        <Image
                            source={icons.heart}
                            resizeMode='contain'
                            style={styles.searchBtnImage}
                        />
                    </TouchableOpacity>
                ),
            }}
        />
        {/* <View style={{flex:1}}> */}
        <SearchComponent/>
        {/* </View> */}
    </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: COLORS.backgroundColor,
    },
    searchBtn: {
        width: 30,
        height: "100%",
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        margin:10,
        padding:5,
       alignSelf:'flex-end',
    //   paddingTop:15
      },
      searchBtnImage: {
        width: "100%",
        height: "100%",
        tintColor: COLORS.backgroundColor,
      },
});

//make this component available to the app
export default Search;
