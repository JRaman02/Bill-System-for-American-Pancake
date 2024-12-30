import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView, Image, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const UpdateMenuPage = ({ route, navigation }) => {
  // Get the passed pancake data from route.params with fallback to empty object if undefined
  const { pancake } = route.params || {};

  // If pancake is not available, return a loading state
  if (!pancake) {
    return <Text>Loading...</Text>;
  }

  // Provide default values in case any property of pancake is undefined
  const [name, setName] = useState(pancake?.name || '');
  const [price, setPrice] = useState(pancake?.price?.toString() || '');
  const [rating, setRating] = useState(pancake?.rating?.toString() || '');
  const [time, setTime] = useState(pancake?.time || '');
  const [cuisine, setCuisine] = useState(pancake?.cuisine || '');
  const [discount, setDiscount] = useState(pancake?.discount || '');
  const [image, setImage] = useState(pancake?.image_url || null); // Set the initial image URL

  const handleUpdate = async () => {
    // Ensure price is a valid number greater than 0
    if (isNaN(price) || parseFloat(price) <= 0) {
      Alert.alert('Invalid Input', 'Price must be a valid number greater than 0.');
      return;
    }

    // Prepare updated pancake data
    const updatedPancake = {
      name,
      price: parseFloat(price),
      rating: parseFloat(rating),
      time,
      cuisine,
      discount,
      image: image, // Include the image in the update payload
    };

    try {
      const response = await fetch(`http://192.168.29.148:8000/pancake_api/pancake/${pancake.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPancake),
      });

      if (response.ok) {
        const updatedData = await response.json();
        console.log('Updated Pancake:', updatedData);
        Alert.alert('Success', 'Pancake updated successfully!');
        navigation.goBack(); // Navigate back after update
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error updating pancake:', error);
      Alert.alert('Error', 'Failed to update pancake.');
    }
  };

  const selectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
        includeBase64: false,
        maxWidth: 1000,
        maxHeight: 1000,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          setImage({ uri: response.assets[0].uri });
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Pancake</Text>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
          />
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="Price"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={rating}
            onChangeText={setRating}
            placeholder="Rating"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={time}
            onChangeText={setTime}
            placeholder="Time"
          />
          <TextInput
            style={styles.input}
            value={cuisine}
            onChangeText={setCuisine}
            placeholder="Cuisine"
          />
          <TextInput
            style={styles.input}
            value={discount}
            onChangeText={setDiscount}
            placeholder="Discount"
          />

          {/* Image Upload Section */}
          {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
          <TouchableOpacity style={styles.button} onPress={selectImage}>
            <Text style={styles.buttonText}>Select Image</Text>
          </TouchableOpacity>

          <Button title="Update" onPress={handleUpdate} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  imagePreview: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 15,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default UpdateMenuPage;
