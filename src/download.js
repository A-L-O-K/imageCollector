import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Slider from 'react-native-slider';
import { firebase } from '../config';
import { Picker } from '@react-native-picker/picker';

const DownloadFile = () => {
  const [sliderValue, setSliderValue] = useState(10);
  const [selectedAlphabet, setSelectedAlphabet] = useState('A'); // Initial value 'A'

  const downloadFile = async () => {
    // try {
    //   const filename = `${selectedAlphabet}_your_filename_here`;
    //   const url = await firebase.storage().ref().child(filename).getDownloadURL();
    //   Alert.alert('Download URL:', url);
    // } catch (error) {
    //   console.error(error);
    //   Alert.alert('Error downloading file');
    // }

    // print the selected alphabet and the number of images to download
    console.log('Selected Alphabet:', selectedAlphabet);
    console.log('Number of Images:', sliderValue);
  };

  return (
    <View style={styles.container}>
      {/* Dropdown for selecting alphabet */}
      <Picker
        selectedValue={selectedAlphabet}
        onValueChange={(itemValue) => setSelectedAlphabet(itemValue)}
        style={styles.picker}
      >
        {/* Add all alphabets from A to Z */}
        {Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index)).map((alphabet) => (
          <Picker.Item key={alphabet} label={alphabet} value={alphabet} color='black'/>
        ))}
      </Picker>

      <Text style={styles.instructions}>
        Select the number of images you want to download
      </Text>

      <Slider
        style={styles.slider}
        minimumValue={10}
        maximumValue={10000}
        step={1}
        value={sliderValue}
        onValueChange={(value) => setSliderValue(value)}
      />
      
      <Text style={styles.sliderValue}>{sliderValue}</Text>

      {/* Spacer */}
      <View style={{ height: 20 }} />

      <TouchableOpacity style={styles.downloadButton} onPress={downloadFile}>
        <Text style={styles.buttonText}>Download</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  instructions: {
    fontSize: 18,
    marginBottom: 20,
  },

  slider: {
    width: '100%',
    marginVertical: 20,
  },

  sliderValue: {
    fontSize: 16,
    marginBottom: 10,
  },

  downloadButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },

  picker: {
    height: 50,
    width: 100,
    marginBottom: 20,
  },
});

export default DownloadFile;
