/*
 * App Component
 * Routes the user to the desired component
 */

import React, {Component} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Routes
import Home from './Home';
import Page2 from './Page2';

const Stack = createNativeStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Branch App" component={Home} />
          <Stack.Screen name="In-App routing" component={Page2} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
