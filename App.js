import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from './HomePage';
import ListOfCategories from './ListOfCategories';
import Questions from './Questions';
import GameOver from './GameOver';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
            headerBackVisible: false,
            gestureEnabled: false
          }}>
        <Stack.Screen name="HomePage" component={HomePage} options = {{headerShown: false}}/>
        <Stack.Screen name="ListOfCategories" component={ListOfCategories} options = {{headerShown: false}}/>
        <Stack.Screen name="Questions" component={Questions} options = {{headerShown: false}}/>
        <Stack.Screen name="GameOver" component={GameOver} options = {{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
