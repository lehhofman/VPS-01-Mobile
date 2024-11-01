import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SingUpScreen';
import ListaScreen from './screens/ListaScreen';
import VisuScreen from './screens/VisuScreen';

const Stack = createStackNavigator();

export default function App() {

  return (

    <NavigationContainer>

      <Stack.Navigator initialRouteName="Login">

        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Lista de Entradas" component={ListaScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="Visualizar Entrada" component={VisuScreen}/>

      </Stack.Navigator>

    </NavigationContainer>


  );

}