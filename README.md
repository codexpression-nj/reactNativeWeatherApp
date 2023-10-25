# reactNativeWeatherApp
## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [API Integration](#api-integration)
- [Building the Project](#building-the-project)
- [Additional Features](#additional-features)
- [License](#license)
- [Contact](#contact)

## Overview

The Weather App is a React Native Expo mobile application that provides real-time weather information based on the user's current location. It also includes features like saving and viewing favorite locations and extra information about specific locations.Google Places API is used for location services.

## API Integration

The app connects to the following APIs for weather data:

- [OpenWeatherMap Current Weather API](https://openweathermap.org/current): Provides real-time weather information.
- [OpenWeatherMap 5-Day Forecast API](https://openweathermap.org/forecast5): Offers a 5-day weather forecast.

The Google Places API is used for location services, including searching for and retrieving location information.

## Conventions

### Code Style

I follow the JavaScript and React Native code style guidelines.
## Architecture

The Weather App is built with the following technology stack:

- **React Native Expo**: For cross-platform mobile app development with simplified setup.
- **Hooks**: For state management.
- **Layout routes**: For navigation between screens.
- **Fetch**: For making HTTP requests to OpenWeatherMap API and Google places.
- **Google Places API**: For extra location information.


## Building the Project

To build and run the project, follow these steps:

1. Clone or download this repository to your local machine.
2. Ensure you have Node.js, Expo CLI, and the Expo Go app installed on your mobile device.
3. Open a terminal and navigate to the project directory.
4. Install the required dependencies:

   ```bash
   npm install
