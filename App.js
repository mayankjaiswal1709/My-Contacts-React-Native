import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import setAuthToken from './src/setAuthToken'; // Make sure to import the setAuthToken function
import Login from './src/Login';
import Register from './src/Register'
import AllContact from './src/AllContact'
import Home1 from './src/Home1'
import EditContact from './src/EditContact'
import axios from "axios";



const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('x-auth-token');
        if (token) {
          setAuthToken(token);
        }
      } catch (error) {
        console.error('Error fetching token from AsyncStorage:', error);
      }
    };

    fetchToken();
  }, []);

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="default" />
        <Text style={styles.titleText}>My Contact Book</Text>
        <Stack.Navigator initialRouteName="Register">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Contact" component={Home1} />
          <Stack.Screen name="AllContact" component={AllContact} />
          <Stack.Screen name="EditContact" component={EditContact} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
