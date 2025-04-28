import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListOfCategories from './ListOfCategories';
import Questions from './Questions';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
            headerBackVisible: false,
            gestureEnabled: false
          }}>
        <Stack.Screen name="ListOfCategories" component={ListOfCategories} options = {{headerShown: false}}/>
        <Stack.Screen name="Questions" component={Questions} options = {{headerShown: false}}/>
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
