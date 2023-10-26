# reactNativeWeatherApp
## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [API Integration](#api-integration)
- [Building the Project](#building-the-project)


## Overview

The Weather App is a React Native Expo mobile application that provides real-time weather information based on the user's current location. It also includes features like saving and viewing favorite locations and extra information about specific locations.Google Places API is used for location services.



## Conventions

### Code Style

I follow the JavaScript and React Native code style guidelines.

## Architecture

The Weather App is built with the following technology stack:

- **React Native Expo**: For cross-platform mobile app development with simplified setup.
- **Hooks**: For state management.
- **Layout routes**: For navigation between screens.
- **Fetch**: For making HTTP requests to OpenWeatherMap API and Google places.
- **Google Places API**: Used The Place Autocomplete service to provide a query prediction for text-based geographic searches, by returning suggested queries as you type in the search bar. Used Place Search service, to request more details about a particular establishment or point of interest by initiating a Place Details request. A Place Details request returns more comprehensive information about the indicated place such as its complete address, phone number, user rating and reviews.

## API Integration

The app connects to the following APIs for weather data and loction data:

- [OpenWeatherMap Current Weather API](https://openweathermap.org/current): Provides real-time weather information.
- [OpenWeatherMap 5-Day Forecast API](https://openweathermap.org/forecast5): Offers a 5-day weather forecast.
- [Place Details requests](https://maps.googleapis.com/maps/api/place/details/output?parameters): returns more comprehensive information about the indicated place such as its complete address, phone number, user rating and reviews.
- [GooglePlacesAutocomplete](https://maps.googleapis.com/maps/api/place/autocomplete/output?parameters):The service can be used to provide autocomplete functionality for text-based geographic searches, by returning places such as businesses, addresses and points of interest as a user types. The geographic search results is then used to fetch the weather details of the place.

### Component Hierarchy

The app consists of multiple screens and components, such as:
- `home.jsx`: Displaying weather information based on the user's location.
- `locationList.jsx`: Viewing and managing favorite locations.
- `placeDetailsView.jsx`: Extra information about a specific location.
- `search.jsx`: Displaying weather information based on user's search.

## Building the Project

To build and run the project, follow these steps:

1. Clone or download this repository to your local machine.
2. Ensure you have Node.js, Expo CLI, and the Expo Go app installed on your mobile device.
3. Open a terminal and navigate to the project directory.
4. Install the required dependencies:

   ```bash
   npm install
 
   Run the app on an emulator or physical device:

 ```bash
  
 npx expo start  


Access the app on your mobile device.
