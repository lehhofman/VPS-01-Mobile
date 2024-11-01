import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Lista de Entradas');
    } catch (error) {
      Alert.alert("Erro ao fazer login", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diary Travel</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.signupText}>
        Ainda não possui uma conta?{' '}
        <Text
          style={styles.signupLink}
          onPress={() => navigation.navigate('Cadastro')}
        >
          Cadastrar
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#333', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#f5edf0',
    textAlign: 'center', 
  },
  input: {
    backgroundColor: '#f5edf0', 
    borderWidth: 1,
    borderColor: '#201c6d', 
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: '#333', 
  },
  button: {
    backgroundColor: '#511c8c',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  signupText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#f5edf0', 
  },
  signupLink: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});
