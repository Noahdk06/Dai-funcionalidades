import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import Contacts from 'react-native-contacts';

export default function ContactsScreen() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    Contacts.requestPermission().then(permission => {
      if (permission === 'authorized') {
        Contacts.getAll().then(setContacts);
      }
    });
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={contacts}
        keyExtractor={item => item.recordID}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.givenName} {item.familyName}</Text>
            <Text>{item.phoneNumbers.length > 0 ? item.phoneNumbers[0].number : 'No phone number'}</Text>
          </View>
        )}
      />
    </View>
  );
}
