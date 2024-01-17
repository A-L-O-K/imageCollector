import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';

// Import screens
import UploadMediaFile from './src/upload';
import DownloadFile from './src/download';
import LoginScreen from './src/login';
import SignUpScreen from './src/signup';
// import HomeScreen from './src/homepage';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>      
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="UploadMediaFile" component={UploadMediaFile} />
        <Stack.Screen name="DownloadFile" component={DownloadFile} />
        
        {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
