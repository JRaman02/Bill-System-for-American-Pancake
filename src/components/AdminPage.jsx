import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  Pressable,
  Animated,
} from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';

const AdminPage = ({ navigation }) => {
  // Animated values
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animation sequence for logo
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    // Staggered button animations
    Animated.timing(buttonOpacity, {
      toValue: 1,
      duration: 1000,
      delay: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  // Function to handle Menu button press
  const handleMenuPress = (action) => {
    if (action === 'MenuListPage') {
      navigation.navigate('MenuListPage'); // Navigate to List of Menu
    } else if (action === 'AddMenuPage') {
      navigation.navigate('AddMenuPage'); // Navigate to Add Menu Page
    }
  };

  // Function to handle Add Table button press
  const handleAddTablePress = () => {
    navigation.navigate('AddTablePage'); // Navigate to Add Table Page
  };

  // Function to handle Add Pancake button press
  const handlePancakePress = () => {
    navigation.navigate('PancakePage'); // Navigate to Add Pancake Page
  };

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('Login')} style={styles.home}>
          <ArrowLeftIcon size={28} color="black" />
        </Pressable>
      </View>

      {/* Add Animated Image at the top */}
      <Animated.Image
        source={require('../assets/images/logo.png')} // Adjust the path as necessary
        style={[
          styles.image,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      />
      <Text style={styles.title}>Welcome to the Admin Page</Text>

      <Animated.View
        style={[
          styles.buttonContainer,
          { opacity: buttonOpacity },
        ]}
      >
        <Button title="View Menu" onPress={() => handleMenuPress('MenuListPage')} />
      </Animated.View>

      <Animated.View
        style={[
          styles.buttonContainer,
          { opacity: buttonOpacity },
        ]}
      >
        <Button title="Add Menu" onPress={() => handleMenuPress('AddMenuPage')} />
      </Animated.View>

      <Animated.View
        style={[
          styles.buttonContainer,
          { opacity: buttonOpacity },
        ]}
      >
        <Button title="Add Table" onPress={handleAddTablePress} />
      </Animated.View>

      <Animated.View
        style={[
          styles.buttonContainer,
          { opacity: buttonOpacity },
        ]}
      >
        <Button title="Pancake" onPress={handlePancakePress} />
      </Animated.View>
    </View>
  );
};

// Basic styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    position: 'absolute',
    top: 40, // Adjust based on where you want the header to appear
    left: 10,
    zIndex: 1, // Ensure the back button stays on top of other elements
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
  },
  home: {
    padding: 5,
  },
  image: {
    width: '100%', // Adjust the width to fit the container
    height: 200, // Adjust the height as necessary
    marginBottom: 20, // Add some space below the image
  },
});

export default AdminPage;
