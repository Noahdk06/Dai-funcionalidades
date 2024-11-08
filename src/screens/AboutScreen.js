import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const AboutScreen = () => {
  // Ruta local de la imagen o URL remota
  const imageSource = require('./img/ec.png'); // Para imagen local
  // const imageSource = { uri: 'https://tu-imagen-url.com/logo.png' }; // Para imagen remota

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acerca de la Aplicación</Text>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.subtitle}>Proyecto desarrollado por:</Text>
      <Text style={styles.teamText}>Iván Frankowski, Noah Denenberg Korob, Uma Gotfryd</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa', // Fondo suave
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
  },
  teamText: {
    fontSize: 14,
    color: '#777',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default AboutScreen;
