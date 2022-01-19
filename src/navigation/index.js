import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from '../screens/Main';
import AddContactScreen from '../screens/AddContact';
import ContactScreen from '../screens/Contact';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Contacts"
        component={Main}
        options={{headerShown: false}}
      />
      <Stack.Screen name="AddContactScreen" component={AddContactScreen} />
      <Stack.Screen name="ContactScreen" component={ContactScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;
