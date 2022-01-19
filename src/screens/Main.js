import React, {useEffect, useLayoutEffect, useState, useCallback} from 'react';
import {useNavigation} from '@react-navigation/core';
import {
  RefreshControl,
  StatusBar,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, ListItem} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import isEmpty from 'lodash/isEmpty';
import debounce from 'lodash/debounce';
import {useDispatch} from 'react-redux';

import {useSelector} from 'react-redux';
import {contactsSelector, contactsAction} from '../stores/slices/contactsSlice';

const Main = () => {
  const navigation = useNavigation();
  const [DataArr, setDataArr] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [search, onChangeText] = useState('');

  const dispatch = useDispatch();

  const contactsArr = useSelector(contactsSelector.contacts);

  const AddContact = () => {
    navigation.navigate('AddContactScreen');
  };

  const onContactPress = (item, index) => {
    navigation.navigate('AddContactScreen', {
      index,
      contact: item,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerRight: () => (
        <Button
          type="clear"
          icon={{
            name: 'home',
            size: 30,
            color: 'blue',
          }}
          onPress={AddContact}
        />
      ),
    });
  });

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@contactsKey');
      if (value === null) {
        setDataArr([]);
      } else {
        setDataArr(JSON.parse(value));
      }
    } catch (e) {}
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  }, []);

  const searchContact = searchtxt => {
    if (isEmpty(searchtxt)) {
      getData();
      return;
    }
    const res = DataArr.filter(
      item => item.lname.toLowerCase().indexOf(searchtxt) !== -1,
    );
    setDataArr(res);
  };

  const handleSearch = debounce(val => {
    searchContact(val);
  }, 600);

  const headerItem = () => {
    return (
      <View>
        <TextInput
          style={styles.SearchBar}
          value={search}
          onChangeText={val => {
            onChangeText(val);
            handleSearch(val);
          }}
        />
      </View>
    );
  };

  const deleteContact = async index => {
    DataArr.splice(index, 1);

    await dispatch(
      contactsAction.deleteContact({
        index: index,
      }),
    );

    // try {
    //   await AsyncStorage.setItem('@contactsKey', JSON.stringify(DataArr));
    //   await getData();
    // } catch (e) {}
  };

  const renderItem = ({item, index}) => {
    console.log('item: ', item);
    return (
      <ListItem.Swipeable
        rightContent={
          <Button
            title="Delete"
            icon={{name: 'delete', color: 'white'}}
            buttonStyle={{minHeight: '100%', backgroundColor: 'red'}}
            onPress={() => {
              deleteContact(index);
            }}
          />
        }>
        <ListItem.Content>
          <TouchableOpacity onPress={() => onContactPress(item, index)}>
            <ListItem.Title>
              {item.lname} {item.fname}
            </ListItem.Title>
            <ListItem.Subtitle>{item.phoneNo}</ListItem.Subtitle>
          </TouchableOpacity>
        </ListItem.Content>
      </ListItem.Swipeable>
    );
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <StatusBar barStyle="default" />
      {headerItem()}
      <FlatList
        data={contactsArr}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  SafeAreaView: {
    backgroundColor: '#fff',
  },
  ListView: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderBottomColor: '#000',
    borderBottomWidth: 0.5,
  },
  ListViewText: {
    fontSize: 16,
    fontWeight: '600',
  },
  SearchBar: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});
