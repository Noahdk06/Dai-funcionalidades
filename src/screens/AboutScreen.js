import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const AboutScreen = () => {
  const qrValue = "Integrantes: Iván Frankowski, Noah Denenberg Korob y Uma Gotfryd";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acerca de la Aplicación</Text>
      <Text style={styles.subtitle}>Proyecto desarrollado por:</Text>
      <Image
        source={{ uri: 'https://www.rumblestars.net/img/rumblers/rs-explosivechick.png' }}
        style={styles.logo}
      />
      <Text style={styles.teamText}>Iván Frankowski, Noah Denenberg Korob, Uma Gotfryd</Text>
    </View>
  );
}; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa', 
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
  logo: {
    width: 100,  
    height: 100,  
    marginTop: 20,
    resizeMode: 'contain', 
  },
});

export default AboutScreen;
