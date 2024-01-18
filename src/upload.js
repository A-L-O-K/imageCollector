import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
  ActivityIndicator,
} from
 
'react-native';
import * as ImagePicker from
 
'expo-image-picker';
import { firebase } from '../config';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import DownloadFile from './download';
import { Swipeable } from 'react-native-gesture-handler';

const UploadMediaFile = () => {
  const navigation = useNavigation(); // Access the navigation object
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadMedia = async () => {
    setUploading(true);
    try {
      const { uri } = await FileSystem.getInfoAsync(image);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });

      const filename = image.substring(image.lastIndexOf('/') + 1);
      const ref = firebase.storage().ref().child(filename);

      await ref.put(blob);
      setUploading(false);
      Alert.alert('Image Uploaded!');
      setImage(null);
    } catch (error) {
      console.error(error);
      setUploading(false);
      Alert.alert('Error uploading image');
    }
  };

  

  const navigateToDownload = () => {
    navigation.navigate('DownloadFile');
    console.log("Swiped");
  };

  const renderLeftActions = () => (
    // <TouchableOpacity style={styles.leftAction} onPress={navigateToDownload}>
    //   <Text style={styles.actionText}>Download</Text>
    // </TouchableOpacity>

    // change the colour of the button

    <TouchableOpacity style={[styles.uploadButton, backgroundColor = "green"]} onPress={navigateToDownload}>
      <Text style={styles.buttonText}>Download</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      
      <Text style={styles.usernameText}>Rithin Chand</Text>
      <View style={{ height: 200}}/>
      <View style={styles.mainContent}>
        <TouchableOpacity style={styles.selectButton} onPress={takePhoto}>
          <Text style={styles.buttonText}>Take a Photo</Text>
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          {image && <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />}
          <Swipeable renderLeftActions={renderLeftActions}>
            <TouchableOpacity style={styles.uploadButton} onPress={uploadMedia} disabled={uploading}>
              {uploading ? (
                <ActivityIndicator size="large" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Upload image</Text>
              )}
            </TouchableOpacity>
          </Swipeable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UploadMediaFile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    
  },
  usernameText: {
    fontSize: 35,
    color: '#333',
    fontWeight: 'bold',
    
    
  },
  selectButton: {
    borderRadius: 5,
    width: 150,
    height: 150,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },

  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 150,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center',
  },

  leftAction: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'flex-start', // Align text to the start
    paddingLeft: 20, // Add some left padding
    flex: 1,
    borderRadius: 5,
  },
  
  actionText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignItems: 'center',
    height: 30,
    
  },

});
