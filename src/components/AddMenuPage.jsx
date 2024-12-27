import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  Animated,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';

const AddMenuPage = ({ navigation }) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [time, setTime] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [discount, setDiscount] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const imageOpacity = useRef(new Animated.Value(0)).current;
  const formTranslateY = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.timing(imageOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(formTranslateY, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

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

  const handleAddMenu = async () => {
    if (!name || !rating || !time || !cuisine || !discount || !price || !image) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('rating', rating);
      formData.append('time', time);
      formData.append('cuisine', cuisine);
      formData.append('discount', discount);
      formData.append('price', price);
      formData.append('image_url', {
        uri: image.uri,
        name: 'menu-item.jpg',
        type: 'image/jpeg',
      });

      const response = await fetch('http://192.168.29.148:8000/pancake_api/pancake/', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (response.ok) {
        Alert.alert('Success', 'Menu item added successfully!');
        setName('');
        setRating('');
        setTime('');
        setCuisine('');
        setDiscount('');
        setPrice('');
        setImage(null);
      } else {
        const errorData = await response.json();
        Alert.alert('Error', `Failed to add menu item: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please check your connection.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeftIcon size={24} color="black" />
        </Pressable>
        <Text style={styles.headerTitle}>Add Menu Item</Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Animated.Image
            source={require('../assets/images/logo.png')}
            style={[styles.logo, { opacity: imageOpacity }]}
          />

          <Animated.View style={[styles.card, { transform: [{ translateY: formTranslateY }] }]}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#aaa"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Rating (e.g., 4.5)"
              placeholderTextColor="#aaa"
              value={rating}
              onChangeText={setRating}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Time (e.g., 30-35 mins)"
              placeholderTextColor="#aaa"
              value={time}
              onChangeText={setTime}
            />
            <TextInput
              style={styles.input}
              placeholder="Cuisine (e.g., South Indian)"
              placeholderTextColor="#aaa"
              value={cuisine}
              onChangeText={setCuisine}
            />
            <TextInput
              style={styles.input}
              placeholder="Discount (e.g., 40% OFF)"
              placeholderTextColor="#aaa"
              value={discount}
              onChangeText={setDiscount}
            />
            <TextInput
              style={styles.input}
              placeholder="Price (e.g., ₹60)"
              placeholderTextColor="#aaa"
              value={price}
              onChangeText={setPrice}
              keyboardType="default"
            />

            {image && <Image source={image} style={styles.imagePreview} />}
            <TouchableOpacity style={styles.button} onPress={selectImage}>
              <Text style={styles.buttonText}>Select Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.addButton]} onPress={handleAddMenu}>
              <Text style={styles.buttonText}>Add Menu Item</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    elevation: 2,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  logo: {
    width: 250,
    height: 150,
    alignSelf: 'center',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
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
  addButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default AddMenuPage;
