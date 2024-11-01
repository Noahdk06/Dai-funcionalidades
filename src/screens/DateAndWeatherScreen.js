import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

export default function DateAndWeatherScreen() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      ({ coords }) => setLocation(coords),
      error => console.error(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  useEffect(() => {
    if (location) {
      const fetchWeather = async () => {
        const { latitude, longitude } = location;
        try {
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=YOUR_API_KEY&units=metric`);
          setWeather(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchWeather();
    }
  }, [location]);

  return (
    <View style={{ padding: 20 }}>
      <Text>Hora actual: {time}</Text>
      <Text>Temperatura: {weather ? `${weather.main.temp}°C` : "Cargando..."}</Text>
    </View>
  );
}
