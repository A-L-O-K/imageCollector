import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Slider from "react-native-slider";
import { firebase } from "../config";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config";
import { getStorage, ref, listAll } from "firebase/storage";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

const DownloadFile = () => {
  const [sliderValue, setSliderValue] = useState(10);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const downloadFile = async () => {
    if (value == null) {
      Alert.alert("Please select a Shabdha");
    } else {
      var docRef = db.collection("links").doc(value);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            downloadImage(doc.data().imageurls);
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }

    console.log("Number of Images:", sliderValue);
  };

  async function downloadImage(images) {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        for (let i = 0; i < images.length; i++) {
          const fileUri = FileSystem.documentDirectory + images[i].split("/").pop();
          console.log("File URI:", fileUri);
          const downloadResumable = FileSystem.createDownloadResumable(images[i], fileUri,{},false);
          const { uri } = await downloadResumable.downloadAsync(null,{shouldCache:false});
          console.log("Finished downloading to ", uri);
          const asset = await MediaLibrary.createAssetAsync(uri);
          console.log("Asset:", asset);
          Alert.alert("Downloaded", "Downloaded Successfully");
        }
      }
      
    } catch (e) {
      console.log(e);
    }
  }

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Select among the Following Shabdhas
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
    { label: "ए", value: "9" },
    { label: "ऐ", value: "10" },
    { label: "ओ", value: "11" },
    { label: "औ", value: "12" },
    { label: "।", value: "13" },
    { label: "॥", value: "14" },
    { label: "ऽ", value: "15" },
    { label: "॰", value: "16" },
    { label: "ॐ", value: "17" },
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
    // alignItems: 'center',
    // justifyContent: 'center',
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
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
});

export default DownloadFile;
