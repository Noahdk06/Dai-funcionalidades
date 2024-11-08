import React, { useEffect } from 'react';
import { View, Text, Alert, StyleSheet, Image } from 'react-native';
import * as SMS from 'expo-sms';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Accelerometer } from 'expo-sensors';

const EmergencyShakeScreen = () => {
  useEffect(() => {
    const subscription = Accelerometer.addListener(async ({ x, y, z }) => {
      const shake = Math.sqrt(x * x + y * y + z * z);
      if (shake > 1.78) { // ajustar este valor según pruebas
        const phone = await AsyncStorage.getItem('emergencyPhone');
        if (phone) {
          await SMS.sendSMSAsync([phone], "¡Emergencia! Necesito ayuda.");
        } else {
          Alert.alert("Número de emergencia no configurado");
        }
      }
    });
    return () => subscription && subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://img.icons8.com/fluency/96/emergency.png' }}
        style={styles.icon}
      />
      <Text style={styles.text}>Agita el teléfono para enviar un mensaje de emergencia</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffebee',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d32f2f',
    textAlign: 'center',
    marginTop: 20,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default EmergencyShakeScreen;
