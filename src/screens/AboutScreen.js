import React from 'react';
import { View, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const AboutScreen = () => {
  const qrValue = "Integrantes: Juan, María, Pedro";

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Acerca de la Aplicación</Text>
      <QRCode value={qrValue} size={150} />
    </View>
  );
};

export default AboutScreen;
