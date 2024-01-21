import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";

import Slider from "react-native-slider";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { db } from "../config";
import * as FileSystem from "expo-file-system";
import { zip } from "react-native-zip-archive"; // Import only the zip function

window.navigator.userAgent = "ReactNative";
const { NativeEventEmitter, NativeModules } = ReactNative;
const { RNZipArchive } = NativeModules;
// const RNFS = require("react-native-fs");

const DownloadFile = () => {
  const [sliderValue, setSliderValue] = useState(10);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const downloadFile = async () => {
    if (value == null) {
      Alert.alert("Please select a Shabdha");
    } else {
      const docRef = db.collection("links").doc(value);

      try {
        const doc = await docRef.get();
        if (doc.exists) {
          const images = doc.data().imageurls;
          console.log("Document data:", doc);

          // Choose the directory path for storing images based on the platform
          const tempDir = Platform.select({
            ios: `${FileSystem.documentDirectory}images`,
            android: `${FileSystem.documentDirectory}images`,
          });

          // Ensure the directory exists
          await FileSystem.makeDirectoryAsync(tempDir, { intermediates: true });

          // Download images to the temporary directory
          const downloadPromises = images.map(async (imageUrl, index) => {
            const imagePath = `${tempDir}/image_${index}.jpg`;
            const response = await FileSystem.downloadAsync(
              imageUrl,
              imagePath
            );
            return response.uri;
          });

          await Promise.all(downloadPromises);

          // Specify the desired path for saving the zip file
          const savePath = `${FileSystem.documentDirectory}myDownloadedFiles.zip`;

          // Create a zip file from the downloaded images
          await zip(
            images.map((_, index) => `${tempDir}/image_${index}.jpg`),
            savePath
          );

          console.log("Zip file created:", savePath);

          // Now you can use the savePath as needed, for example, upload or share it.
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error);
      }
    }

    console.log("Selected Alphabet:", value);
    console.log("Number of Images:", sliderValue);
  };

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Select among the Following Shandhas
        </Text>
      );
    }
    return null;
  };

  const data = [
    { label: "अ", value: "1" },
    { label: "आ", value: "2" },
    { label: "इ", value: "3" },
    { label: "ई ", value: "4" },
    { label: "उ ", value: "5" },
    { label: "ऊ", value: "6" },
    { label: "ऋ", value: "7" },
    { label: "ऌ", value: "8" },
    { label: "ए", value: "8" },
    { label: "ऐ", value: "8" },
    { label: "ओ", value: "8" },
    { label: "औ", value: "8" },
    { label: "।", value: "8" },
    { label: "॥", value: "8" },
    { label: "ऽ", value: "8" },
    { label: "॰", value: "8" },
    { label: "ॐ", value: "8" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.containerWithoutCentering}>
        {renderLabel()}
        <Dropdown
          style={[
            styles.dropdown,
            isFocus && { borderColor: "blue" },
            { overflow: "visible" },
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "Select item (चुनें)" : "..."}
          searchPlaceholder="Search (खोज)..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? "blue" : "black"}
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
        <Text style={styles.instructions}>
          उन छवियों की संख्या चुनें जिन्हें आप डाउनलोड करना चाहते हैं
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
          <Text style={styles.buttonText}>डाउनलोड करना</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerWithoutCentering: {},
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },

  instructions: {
    fontSize: 12,
    marginBottom: 20,
  },

  slider: {
    width: "100%",
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
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default DownloadFile;
