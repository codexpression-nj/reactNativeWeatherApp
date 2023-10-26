import { useState, useEffect } from "react";
import * as Location from 'expo-location';

const useFetch = () => {
  const [daysForecast, setDaysForecastData] = useState();
  const [currentWeather, setCurrentWeather] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // const [isCurrentWeatherLoading]
  const [error, setError] = useState(null);
  const [cityName, setCityName] = useState(null)
  const apiWeatherKey = process.env.EXPO_PUBLIC_API_KEY_WEATHER;

  // retreiving weather data of current day
  const fetchCurrentData = async () => {
    setIsLoading(true);
    // await getLocation().then(data => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('You need to permit the app to use location of your device')
        console.log('permission denied');
        return;
      }
      let data = await Location.getCurrentPositionAsync({});
      let lat = data.coords.latitude
      let log = data.coords.longitude
      
    await  fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${apiWeatherKey}&units=metric`,
      )
        .then(res => res.json())
        .then((res) => {
          setCurrentWeather(res)
          if(res){
            
            fetch(
              `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${log}&appid=${apiWeatherKey}&cnt=40&units=metric`,
            )
              .then(res => res.json())
              .then((res) => {
                setDaysForecastData(res)
                setIsLoading(false);

              })
              .catch((err) => {
                setError('err')
                // setIsLoading(false)
                console.log('r00r' + err)
              })
          }else{
            console.log('nothing');
          }
        })
        .catch((err) => {
          setError('Coulding fetch data')
        })
    }

  

  useEffect(() => {
    // getLocation();
    fetchCurrentData();
    // fetchData();
  }, []);

  const refetch = () => {
    fetchCurrentData()
    // fetchData();
  };


  return { daysForecast, isLoading, error, refetch, currentWeather };
};
export default useFetch;