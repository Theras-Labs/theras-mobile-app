/* eslint-disable */
import React from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  StatusBar,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import RootStack from './src/navigations/root';

export default class App extends React.Component {
  render() {
    // return <RootStack />;
    return (
      <View>
        <Text>Test</Text>
      </View>
    );
  }
}
