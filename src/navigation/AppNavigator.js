import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {StyleSheet, View } from 'react-native';

import LinkingConfiguration from './LinkingConfiguration';

import SignupScreen from '../screens/Signup'
import OtpScreen from '../screens/OtpScreen'
import HomeScreen from '../screens/Home'
import CartScreen from '../screens/Cart'
import OrderScreen from '../screens/OrderSuccess'


const Stack = createStackNavigator();

export default function AppNavigator(){


    return(
    <View style={styles.container}>
        <NavigationContainer linking={LinkingConfiguration}>
          <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Cart" component={CartScreen} />
            <Stack.Screen options={{ headerShown: false }} name="OrderSuccess" component={OrderScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Signup" component={SignupScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Otp" component={OtpScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
  });
  