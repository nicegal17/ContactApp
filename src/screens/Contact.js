import React, {useLayoutEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ContactScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: '',
      headerTitleStyle: {
        fontWeight: 'bold',
        flexDirection: 'row',
        justifyContent: 'center',
      },
      headerRight: () => (
        <TouchableOpacity>
          <Text>Edit</Text>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity>
          <Text>Contacts</Text>
        </TouchableOpacity>
      ),
    });
  });

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default ContactScreen;
