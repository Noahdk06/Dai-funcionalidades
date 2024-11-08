import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const screens = [
    { title: "Weather Screen", route: "DateAndWeatherScreen" },
    { title: "Contacts Screen", route: "ContactsScreen" },
    { title: "Emergency Config Screen", route: "EmergencyConfigScreen" },
    { title: "Emergency Shake Screen", route: "EmergencyShakeScreen" },
    { title: "About Screen", route: "AboutScreen" },
  ];

  return (
    <View style={styles.container}>
      {screens.map((screen, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => navigation.navigate(screen.route)}
        >
          <Text style={styles.buttonText}>{screen.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f4f8', // Fondo suave
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    marginVertical: 10,
    backgroundColor: '#6200ee', // Color moderno
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
