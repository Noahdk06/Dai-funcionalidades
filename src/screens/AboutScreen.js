import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const AboutScreen = () => {
  const qrValue = "Integrantes: Iván Frankowski, Noah Denenberg Korob y Uma Gotfryd";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acerca de la Aplicación</Text>
      <Text style={styles.subtitle}>Proyecto desarrollado por:</Text>
      <QRCode value={qrValue} size={150} />
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
});

export default AboutScreen;
