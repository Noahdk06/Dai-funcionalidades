import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Weather Screen"
        onPress={() => navigation.navigate('DateAndWeatherScreen')}
      />
      <Button
        title="Contacts Screen"
        onPress={() => navigation.navigate('ContactsScreen')}
      />
      <Button
        title="Emergency Config Screen"
        onPress={() => navigation.navigate('EmergencyConfigScreen')}
      />
      <Button
        title="Emergency Shake Screen"
        onPress={() => navigation.navigate('EmergencyShakeScreen')}
      />
      <Button
        title="About Screen"
        onPress={() => navigation.navigate('AboutScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    marginVertical: 10,
  },
});

export default HomeScreen;
