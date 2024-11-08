import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Animated, Alert } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const DateAndWeatherScreen = () => {
  const [location, setLocation] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [dateTime, setDateTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [scale] = useState(new Animated.Value(1)); // Animación de escala

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
      const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
      setDateTime({
        date: now.toLocaleDateString('es-ES', optionsDate),
        time: now.toLocaleTimeString('es-ES', optionsTime),
      });
    };

    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('No se otorgaron permisos para acceder a la ubicación.');
        Alert.alert('Permiso denegado', 'No se puede acceder a la ubicación.');
        setLoading(false);
        return;
      }
      fetchLocation();
    };

    const fetchLocation = async () => {
      try {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
        const { latitude, longitude } = loc.coords;
        fetchWeather(latitude, longitude);
      } catch (error) {
        setErrorMsg('Error al obtener la ubicación');
        setLoading(false);
      }
    };

    const fetchWeather = async (latitude, longitude) => {
      const apiKey = '989614a8f5ad010e430304b554547c1b'; // Reemplaza con tu propia clave
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      try {
        const response = await axios.get(url);
        setTemperature(response.data.main.temp);
      } catch (error) {
        setErrorMsg('No se pudo obtener la información del clima.');
      }
      setLoading(false);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    requestLocationPermission();

    return () => clearInterval(interval);
  }, [scale]);

  const getTemperatureColor = (temp) => {
    if (temp <= 0) return '#74b9ff'; // Azul frío
    if (temp <= 15) return '#55efc4'; // Verde suave
    if (temp <= 30) return '#fdcb6e'; // Amarillo cálido
    return '#e17055'; // Naranja cálido
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#55efc4" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clima y Hora Actual</Text>
      
      {temperature !== null ? (
        <Animated.Text
          style={[styles.temperature, { color: getTemperatureColor(temperature), transform: [{ scale }] }]}
        >
          {temperature.toFixed(1)}°C
        </Animated.Text>
      ) : (
        <Text style={styles.text}>Temperatura no disponible</Text>
      )}

      {dateTime ? (
        <View style={styles.dateTimeContainer}>
          <Text style={styles.date}>{dateTime.date}</Text>
          <Text style={styles.time}>{dateTime.time}</Text>
        </View>
      ) : (
        <Text style={styles.text}>Fecha y Hora no disponible</Text>
      )}

      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d3436', // Fondo oscuro
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#ffffff', // Título blanco
    marginBottom: 30,
    fontFamily: 'sans-serif-condensed',
  },
  location: {
    fontSize: 18,
    color: '#55efc4', // Verde suave para la ubicación
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 72,
    fontWeight: '700',
    marginBottom: 30,
    fontFamily: 'Arial',
  },
  dateTimeContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  date: {
    fontSize: 20,
    color: '#ffffff', // Blanco para la fecha
    marginBottom: 5,
  },
  time: {
    fontSize: 24,
    color: '#ffffff', // Blanco para la hora
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: '#e17055', // Naranja para mensajes de error
    fontSize: 18,
    marginTop: 20,
  },
});

export default DateAndWeatherScreen;
