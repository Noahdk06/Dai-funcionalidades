import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
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
    Alert.alert('Número guardado!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configura Número de Emergencia:</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        placeholder="Número de Emergencia"
        placeholderTextColor="#aaa"
        value={phone}
        onChangeText={setPhone}
      />
      <TouchableOpacity style={styles.saveButton} onPress={savePhone}>
        <Text style={styles.buttonText}>Guardar Número</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 3,
  },
  saveButton: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#6200ee',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EmergencyConfigScreen;
