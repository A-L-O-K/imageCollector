import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Slider from 'react-native-slider';
import { firebase } from '../config';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const DownloadFile = () => {
  const [sliderValue, setSliderValue] = useState(10);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);


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

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };


  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

  return (
    <View style={styles.container}>
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
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
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

      <View style={{ height: 80 }} />
    <View style={styles.container}>


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
    </View>
  );
};

const styles = StyleSheet.create({
  containerWithoutCentering: {

  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 20,
  },

  instructions: {
    fontSize: 12,
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
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },

});

export default DownloadFile;
