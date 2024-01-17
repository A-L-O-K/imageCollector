import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import LoginScreen from './login';
// import navigation
import { NavigationContainer, navigation, navigate } from '@react-navigation/native';

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  const handleSignUp = () => {
    // Implement your sign-up logic here
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Retype Password:', retypePassword);
  };

  const navigateToSignIn = () => {
    navigation.navigate('LoginScreen');


  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Retype Password"
        secureTextEntry
        value={retypePassword}
        onChangeText={(text) => setRetypePassword(text)}
      />

      {/* Link to Sign In */}
      <TouchableOpacity onPress={navigateToSignIn}>
        <Text style={styles.linkText}>Already have an account? Log In</Text>
      </TouchableOpacity>

      {/* Spacer */}
      <View style={{ height: 20 }} />

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5', // Light background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333', // Dark text color
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ddd', // Light border color
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingLeft: 8,
    backgroundColor: '#fff', // White background color
  },
  signUpButton: {
    backgroundColor: '#28a745', // Green button color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff', // White text color
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#007bff', // Blue link color
    fontSize: 14,
  },
});

export default SignUpScreen;
