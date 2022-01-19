import React, {useLayoutEffect, useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {contactsAction} from '../stores/slices/contactsSlice';

const AddContactScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [EmailAdd, setEmailAdd] = useState('');
  const [contactIndex, setContactIndex] = useState(null);

  const [isUpdate, setIsUpdate] = useState(false);

  const saveContact = async () => {
    const details = {
      email: EmailAdd,
      fname: firstName,
      lname: lastName,
      mname: middleName,
      phoneNo: phoneNo,
    };

    if (isUpdate) {
      await dispatch(
        contactsAction.updateContact({
          ...details,
          index: contactIndex,
        }),
      );
    } else {
      await dispatch(contactsAction.addContact(details));
    }
    navigation.goBack();
  };

  const onClear = async () => {
    await AsyncStorage.clear();
    navigation.goBack();
  };

  useEffect(() => {
    const params = route.params;
    if (params?.contact) {
      const contact = params?.contact;
      setFirstName(contact?.fname);
      setLastName(contact?.lname);
      setMiddleName(contact?.mname);
      setPhoneNo(contact?.phoneNo);
      setEmailAdd(contact?.email);
      setIsUpdate(true);
    }

    setContactIndex(params?.index);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'New Contact',
      headerTitleStyle: {
        fontWeight: 'bold',
        flexDirection: 'row',
        justifyContent: 'center',
      },
      headerRight: () => (
        <TouchableOpacity onPress={saveContact}>
          <Text>Done</Text>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={onClear}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      ),
    });
  });

  return (
    <View style={styles.inputView}>
      <Input
        inputStyle={styles.inputStyles}
        placeholder="First name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <Input
        inputStyle={styles.inputStyles}
        placeholder="Middle name"
        value={middleName}
        onChangeText={setMiddleName}
      />
      <Input
        inputStyle={styles.inputStyles}
        placeholder="Last name"
        value={lastName}
        onChangeText={setLastName}
      />
      <Input
        inputStyle={styles.inputStyles}
        placeholder="Phone Number"
        value={phoneNo}
        onChangeText={setPhoneNo}
      />
      <Input
        inputStyle={styles.inputStyles}
        placeholder="Email Address"
        value={EmailAdd}
        onChangeText={setEmailAdd}
      />
    </View>
  );
};

export default AddContactScreen;

const styles = StyleSheet.create({
  inputView: {
    marginTop: 25,
  },
  inputStyles: {
    fontSize: 16,
    lineHeight: 41,
    letterSpacing: 1.02,
    fontWeight: '600',
  },
});
