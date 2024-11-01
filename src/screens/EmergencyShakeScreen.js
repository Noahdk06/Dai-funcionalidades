import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
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
    <View>
      <Text>Agita el teléfono para enviar un mensaje de emergencia</Text>
    </View>
  );
};

export default EmergencyShakeScreen;
