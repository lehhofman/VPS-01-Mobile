import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Conta criada com sucesso!");
      navigation.navigate('Login'); 
    } catch (error) {
      Alert.alert("Erro ao cadastrar", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <Text style={styles.loginText}>
        Já possui uma conta?{' '}
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate('Login')}
        >
          Entrar
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#333', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#f5edf0', 
  },
  input: {
    backgroundColor: '#f5edf0', 
    borderWidth: 1,
    borderColor: '#201c6d', 
    height: 50,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
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
  loginText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#f5edf0',
  },
  loginLink: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});
