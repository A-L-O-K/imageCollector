import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { auth } from "../config";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("Username:", username);
    console.log("Password:", password);
    // Implement your authentication logic here

    // if (username === "alok@gmail.com" && password === "12345678") {
    //   // navigation.navigate('HomeScreen');
    //   navigation.navigate('UploadMediaFile');
    // }
    // else{
    //   Alert.alert('Incorrect Username or Password');
    // }

    await auth
      .signInWithEmailAndPassword(username, password)
      .then((userCredential) => {
        // Signed in successfully
        console.log("User logged in ! : ", userCredential.user.uid);
        navigation.navigate("UploadMediaFile");
      })
      .catch((error) => {
        // Handle errors
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error logging in: ", errorCode, errorMessage);
      });
  };

  const navigateToSignUp = () => {
    navigation.navigate("SignUpScreen"); // Replace 'SignUp' with the actual screen name
  };

  return (
    <View style={styles.container}>
      <Text style={styles.usernameText}>CSDCA</Text>

      <Text style={styles.title}>Login लॉगिन </Text>

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

      <TouchableOpacity onPress={navigateToSignUp}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>

      {/* Spacer */}
      <View style={{ height: 20 }} />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login लॉगिन </Text>
      </TouchableOpacity>

      {/* Link to Sign Up */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5", // Light background color
  },
  usernameText: {
    fontSize: 35,
    color: "#ff9933",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333", // Dark text color
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ddd", // Light border color
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingLeft: 8,
    backgroundColor: "#fff", // White background color
  },
  loginButton: {
    backgroundColor: "#007bff", // Blue button color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff", // White text color
    fontSize: 16,
    fontWeight: "bold",
  },
  linkText: {
    color: "#007bff", // Blue link color
    fontSize: 14,
  },
});

export default LoginScreen;
