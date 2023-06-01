import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PlayScreen from '../screens/PlayScreen';
import PushScreen from '../screens/PushScreen';
import HomeScreen from '../screens/HomeScreen';
import MainScreen from '../screens/MainScreen';
const Stack = createStackNavigator();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" headerMode="none">
        <Stack.Screen
          name="Home"
          component={MainScreen}
          options={{title: 'iShow'}}
        />
        <Stack.Screen name="Play" component={PlayScreen} />
        <Stack.Screen name="Push" component={PushScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
