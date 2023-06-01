/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import RootStack from './src/navigations/root';

// import {initializeApp} from '@react-native-firebase/app';
// import firestore from '@react-native-firebase/firestore';

export default function App() {
  // useEffect(() => {
  //   async function testLoad() {
  //     const user = await firestore()
  //       .collection('users')
  //       .doc('HjJawmX4pOuEp8e2i0yQ')
  //       .get();
  //     console.log(user, 'RESULT');
  //   }
  //   testLoad();
  // }, []);

  return <RootStack />;
}
