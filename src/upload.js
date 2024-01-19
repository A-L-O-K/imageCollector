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
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../config';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import DownloadFile from './download';
import { Swipeable } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';


const UploadMediaFile = () => {
  const navigation = useNavigation(); // Access the navigation object
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);


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

    <TouchableOpacity style={[styles.someButton, backgroundColor = "green"]} onPress={navigateToDownload}>
      <Text style={styles.buttonText}>Download</Text>
      <Text style={styles.buttonText}>डाउनलोड</Text>
    </TouchableOpacity>
  );

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Select among the Following Shandhas
        </Text>
      );
    }
    return null;
  };


  const data = [
    { label: 'अ', value: '1' },
    { label: 'आ', value: '2' },
    { label: 'इ', value: '3' },
    { label: 'ई ', value: '4' },
    { label: 'उ ', value: '5' },
    { label: 'ऊ', value: '6' },
    { label: 'ऋ', value: '7' },
    { label: 'ऌ', value: '8' },
    { label: 'ए', value: '8' },
    { label: 'ऐ', value: '8' },
    { label: 'ओ', value: '8' },
    { label: 'औ', value: '8' },
    { label: '।', value: '8' },
    { label: '॥', value: '8' },
    { label: 'ऽ', value: '8' },
    { label: '॰', value: '8' },
    { label: 'ॐ', value: '8' },
  ];

  return (
    <SafeAreaView style={styles.container}>

<View style={{ height: 40 }} />
<Text style={styles.usernameText}>Rithin Chand</Text>
<Text style={styles.usernameText}>रीथीन चंद </Text>


<View style={styles.containerWithoutCentering}>
      {renderLabel()}
      <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }, { overflow: 'visible' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item (चुनें)' : '...'}
        searchPlaceholder="Search (खोज)..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? 'blue' : 'black'}
            name="Safety"
            size={20}
          />
        )}
      />
    </View>

    <View style={{ height: 40 }} />
      
    <View style={{ alignItems: 'center' }}>
    {image && <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />}
   </View>

        
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.selectButton} onPress={takePhoto}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>

          
          <Swipeable renderLeftActions={renderLeftActions}>
            <TouchableOpacity style={styles.uploadButton} onPress={uploadMedia} disabled={uploading}>
              {uploading ? (
                <ActivityIndicator size="large" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Upload <Text style={styles.buttonText}>अपलोड</Text></Text>
                
              )}
            </TouchableOpacity>
          </Swipeable>
          
        </View>
        <View style={{ height: 20 }} />
        <Text style={styles.instructions}>
        To download the images, swipe right on the upload button
      </Text>
      <Text style={styles.instructions}>
      छवियां डाउनलोड करने के लिए, अपलोड बटन पर बाईं ओर स्वाइप करें
      </Text>
    </SafeAreaView>
  );
};

export default UploadMediaFile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  usernameText: {
    fontSize: 35,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
    
    
  },

  selectButton: {
    borderRadius: 5,
    width: 90,
    height: 90,
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
    width: 90,
    height: 90,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 20,
  },

  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 35,
    marginTop: 50,
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

  someButton:{
    borderRadius: 5,
    width: 90,
    height: 90,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
