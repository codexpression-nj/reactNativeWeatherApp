import { useState, useEffect } from "react";
import * as Location from 'expo-location';

const useFetch = (city) => {
  const [daysForecast, setDaysForecastData] = useState();
  const [currentWeather, setCurrentWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cityName,setCityName] = useState(null)
  const apiWeatherKey = process.env.EXPO_PUBLIC_API_KEY_WEATHER;

  const fetchCurrentData = async () => {
   await getLocation().then(data =>{
      let lat =data.coords.latitude
      let log = data.coords.longitude
      setIsLoading(true);
       fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${apiWeatherKey}&units=metric`,
      )
        .then(res => res.json())
        .then((res) => {
          setCurrentWeather(res)
          setIsLoading(false);
  
        })
        .catch(err => console.log(err));

    })

  };
  const getLocation = async () =>{
    try {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            // setErrorMsg('Permission to access location was denied');
            console.log('permission denied');
            return;
          }
            let loc = await Location.getCurrentPositionAsync({});
            setCityName(loc)
            return loc
      } catch (error) {
        // Error retrieving data
        console.log(error);
      }
  }


  const fetchData = async () => {
    setIsLoading(true);
    await getLocation().then(data =>{
      let lat =data.coords.latitude
      let log = data.coords.longitude
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${log}&appid=${apiWeatherKey}&cnt=40&units=metric`,
      )
        .then(res => res.json())
        .then((res) => {
          // console.log(rers);
          setDaysForecastData(res)
          setIsLoading(false);
  
        })
        .catch(err => console.log(err));
      //   setData(response.data.data);
    })


  };


  useEffect(() => {
    fetchData();
    fetchCurrentData()
  }, []);

  const refetch = () => {
    setIsLoading(true);
    // fetchCurrentData()
    fetchData();
  };

  
  return { daysForecast, isLoading, error, refetch, currentWeather };
};
export default useFetch;