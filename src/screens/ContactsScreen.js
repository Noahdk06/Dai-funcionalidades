import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as Contacts from 'expo-contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

export default function ContactsScreen() {
  const [contacts, setContacts] = useState([]);
  const [emergencyNumber, setEmergencyNumber] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmergencyNumber = async () => {
      try {
        const number = await AsyncStorage.getItem('emergencyNumber');
        if (number) {
          setEmergencyNumber(formatPhoneNumber(number));
        }
      } catch (error) {
        console.error('Error al obtener el número de emergencia:', error);
      }
    };

    fetchEmergencyNumber();
  }, []);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });
        setContacts(data.length > 0 ? data : []);
        if (data.length === 0) {
          Alert.alert('No se encontraron contactos');
        }
      } else {
        Alert.alert('Permiso para acceder a los contactos denegado');
      }
    } catch (error) {
      console.error('Error al obtener los contactos:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPhoneNumber = (phoneNumber) => {
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    return digitsOnly.slice(-8);
  };

  const renderItem = ({ item }) => {
    const originalPhoneNumber = item.phoneNumbers ? item.phoneNumbers[0].number : 'Sin número';
    const formattedPhoneNumber = item.phoneNumbers ? formatPhoneNumber(item.phoneNumbers[0].number) : '';
    const isEmergencyContact = formattedPhoneNumber === emergencyNumber;

    return (
      <View style={[styles.contactItem, isEmergencyContact && styles.emergencyContactItem]}>
        <View style={styles.contactDetails}>
          <Text style={styles.contactName}>{item.name}</Text>
          <Text style={[styles.contactNumber, isEmergencyContact && styles.emergencyNumber]}>
            {originalPhoneNumber}
          </Text>
        </View>
        {isEmergencyContact && (
          <MaterialIcons name="error" size={24} color="#e63946" style={styles.emergencyIcon} />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#6200ee" />
      ) : contacts.length === 0 ? (
        <Text style={styles.noContactsText}>No hay contactos disponibles</Text>
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.contactList}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    padding: 10,
  },
  contactList: {
    paddingBottom: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  emergencyContactItem: {
    borderColor: '#e63946',
    borderWidth: 1,
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2a2a2a',
    marginBottom: 5,
  },
  contactNumber: {
    fontSize: 16,
    color: '#555',
  },
  emergencyNumber: {
    color: '#e63946',
    fontWeight: 'bold',
  },
  emergencyIcon: {
    marginLeft: 10,
  },
  noContactsText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#555',
    marginTop: 20,
  },
});

