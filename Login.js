import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Importar useNavigation
// npm install @react-native-async-storage/async-storage

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation(); // Hook para la navegación

    const handleLogin = async () => {
        try {
            const response = await fetch('http://192.168.1.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.token) {
                await AsyncStorage.setItem('token', data.token);
                const token = await AsyncStorage.getItem('token');
                Alert.alert('Token guardado', token);
                setEmail('');
                setPassword('');
            } else {
                Alert.alert('Error', 'Correo electrónico o contraseña incorrectos');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Correo electrónico"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TextInput
                placeholder="Contraseña"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text>Iniciar sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    },
});
