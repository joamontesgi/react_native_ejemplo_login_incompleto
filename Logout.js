import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Logout() {

    const handleLogout = async () => {
        try {
            const token = await AsyncStorage.getItem('token');

            if (token) {
                const response = await fetch('http://192.168.1.1:8000/api/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` 
                    },
                    body: JSON.stringify({}),
                });

                if (response.ok) {
                    await AsyncStorage.removeItem('token');
                    Alert.alert('Cierre de sesión', 'Has cerrado sesión correctamente');
                } else {
                    const errorData = await response.json();
                    Alert.alert('Error', errorData.message || 'No se pudo cerrar sesión');
                }
            } else {
                Alert.alert('Error', 'No hay un token de sesión para cerrar');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View>
            <TouchableOpacity onPress={handleLogout}>
                <Text>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

