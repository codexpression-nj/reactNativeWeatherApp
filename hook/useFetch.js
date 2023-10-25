import { useState, useEffect } from "react";
import * as Location from 'expo-location';

const useFetch = () => {
  const [daysForecast, setDaysForecastData] = useState();
  const [currentWeather, setCurrentWeather] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cityName, setCityName] = useState(null)
  const apiWeatherKey = process.env.EXPO_PUBLIC_API_KEY_WEATHER;

  // retreiving weather data of current day
  const fetchCurrentData = async () => {

    await getLocation().then(data => {
      let lat = data.coords.latitude
      let log = data.coords.longitude
      setIsLoading(true);
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${apiWeatherKey}&units=metric`,
      )
        .then(res => res.json())
        .then((res) => {
          setCurrentWeather(res)
          if(res){
            fetchData()
          }
        })
        .catch((err) => {
          setError('Coulding fetch data')
        })
    }).catch((err) => console.log(err))

  };

  // get user current location and requesting device permission
  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('You need to permit the app to use location of your device')
        console.log('permission denied');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
     
      setCityName(loc)
      return loc
    } catch (error) {
      setError('no data ')
      console.log('locwc ' + error);
    }
  }

  // fetching 7 days weather forecast for user location
  const fetchData = async () => {
    setIsLoading(true);

    await getLocation().then(data => {
      let lat = data.coords.latitude
      let log = data.coords.longitude
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
          console.log('r00r' + err)
        })
        ;
    })
  };

  useEffect(() => {
    getLocation();
    fetchCurrentData();
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    // fetchCurrentData()
    fetchData();
  };


  return { daysForecast, isLoading, error, refetch, currentWeather };
};
export default useFetch;