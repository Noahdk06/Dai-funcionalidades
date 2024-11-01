import React from 'react';
import { View, Text, Button } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function AboutScreen() {
  const qrData = "Integrantes del grupo: Nombre1, Nombre2, Nombre3";

  return (
    <View style={{ padding: 20, alignItems: 'center' }}>
      <Text>Información de la Aplicación</Text>
      <QRCode value={qrData} size={200} />
      <Text style={{ marginTop: 20 }}>Integrantes: Nombre1, Nombre2, Nombre3</Text>
    </View>
  );
}
