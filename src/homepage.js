// import React, { useState } from 'react';
// import { Button, View, StyleSheet, Text, Platform } from 'react-native';
// import * as DocumentPicker from 'expo-document-picker';

// const HomeScreen = () => {
//   const [datasetPath, setDatasetPath] = useState(null);

//   const handleUploadDataset = async () => {
//     try {
//       const result = await DocumentPicker.getDocumentAsync({
//         type: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
//         // Add more allowed file types as needed
//       });

//       if (result.uri) {
//         setDatasetPath(result.uri);
//         // Handle dataset upload logic here, using result.uri
//         console.log('Dataset uploaded:', result.uri);
//       }
//     } catch (error) {
//       console.error('Error uploading dataset:', error);
//       // Handle upload errors gracefully
//     }
//   };

//   const handleDownloadDataset = async () => {
//     try {
//       // Implement dataset download logic here
//       console.log('Downloading dataset...');
//     } catch (error) {
//       console.error('Error downloading dataset:', error);
//       // Handle download errors gracefully
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Dataset Management</Text>
//       <Button title="Upload Dataset" onPress={handleUploadDataset} />
//       <Button title="Download Dataset" onPress={handleDownloadDataset} />
//       {datasetPath && (
//         <Text style={styles.infoText}>
//           Dataset uploaded: {datasetPath.split('/').pop()}
//         </Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   infoText: {
//     fontSize: 16,
//     color: Platform.OS === 'ios' ? '#555' : '#333',
//     marginTop: 10,
//   },
// });

// export default HomeScreen;
