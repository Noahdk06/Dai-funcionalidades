import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EmergencyConfigScreen = () => {
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const getPhone = async () => {
      const storedPhone = await AsyncStorage.getItem('emergencyPhone');
      if (storedPhone) setPhone(storedPhone);
    };
    getPhone();
  }, []);

  const savePhone = async () => {
    await AsyncStorage.setItem('emergencyPhone', phone);
    alert('Número guardado!');
  };

  return (
    <View>
      <Text>Configura Número de Emergencia:</Text>
      <TextInput
        keyboardType="phone-pad"
        placeholder="Número de Emergencia"
        value={phone}
        onChangeText={setPhone}
      />
      <Button title="Guardar Número" onPress={savePhone} />
    </View>
  );
};

export default EmergencyConfigScreen;
