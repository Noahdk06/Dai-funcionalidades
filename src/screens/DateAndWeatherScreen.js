import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const DateAndWeatherScreenWeatherScreen = () => {
  const [time, setTime] = useState('');
  const [temperature, setTemperature] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=YOUR_API_KEY&units=metric`);
      setTemperature(response.data.main.temp);
    };

    const updateTime = () => {
      const date = new Date();
      setTime(date.toLocaleTimeString());
    };

    updateTime();
    fetchWeather();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <Text>Hora Actual: {time}</Text>
      <Text>Temperatura: {temperature} °C</Text>
    </View>
  );
};

export default DateAndWeatherScreenWeatherScreen;
