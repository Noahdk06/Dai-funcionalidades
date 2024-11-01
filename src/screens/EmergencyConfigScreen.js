import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EmergencyConfigScreen() {
  const [emergencyNumber, setEmergencyNumber] = useState('');

  useEffect(() => {
    const loadEmergencyNumber = async () => {
      const number = await AsyncStorage.getItem('emergencyNumber');
      if (number) setEmergencyNumber(number);
    };
    loadEmergencyNumber();
  }, []);

  const saveEmergencyNumber = async () => {
    if (!/^\d+$/.test(emergencyNumber)) {
      Alert.alert("Número inválido", "Ingresa un número válido.");
      return;
    }
    await AsyncStorage.setItem('emergencyNumber', emergencyNumber);
    Alert.alert("Número guardado", "Número de emergencia configurado correctamente.");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Configurar Número de Emergencia:</Text>
      <TextInput
        value={emergencyNumber}
        onChangeText={setEmergencyNumber}
        placeholder="Número de Emergencia"
        keyboardType="numeric"
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title="Guardar Número" onPress={saveEmergencyNumber} />
    </View>
  );
}
