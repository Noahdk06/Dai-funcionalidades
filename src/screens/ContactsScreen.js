import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, PermissionsAndroid, Platform } from 'react-native';
import Contacts from 'react-native-contacts';

const ContactsScreen = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Contacts.getAll().then(setContacts);
        } else {
          alert("Permiso de contactos denegado");
        }
      } else {
        // En iOS, la solicitud de permisos de contactos se maneja automáticamente
        Contacts.getAll().then(setContacts).catch(error => {
          console.warn("No se pudo acceder a los contactos:", error);
        });
      }
    };

    fetchContacts();
  }, []);

  return (
    <FlatList
      data={contacts}
      keyExtractor={(item) => item.recordID}
      renderItem={({ item }) => (
        <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ddd' }}>
          <Text>{item.givenName} {item.familyName} - {item.phoneNumbers[0]?.number || 'Sin número de teléfono'}</Text>
        </View>
      )}
    />
  );
};

export default ContactsScreen;
