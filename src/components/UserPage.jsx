import React, { useEffect, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, Pressable } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';

const UserPage = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // For fade-in animation
  const translateYAnim = useRef(new Animated.Value(50)).current; // For slide-up animation

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, translateYAnim]);

  const handleBooking = () => {
    console.log('Booking_Table');
    navigation.navigate('Booking_Table'); // Navigate to the Booking Page
  };

  const handleDelivery = () => {
    console.log('Home_Delivery');
    navigation.navigate('Home_Delivery'); // Navigate to the Delivery Page
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('Login')} style={styles.homeButton}>
          <ArrowLeftIcon size={28} color="#fff" />
        </Pressable>
      </View>
      <Animated.View
        style={[
          styles.imageContainer,
          { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] },
        ]}
      >
        <Image
          source={require('../assets/images/logo.png')} // Adjust the path as necessary
          style={styles.image}
        />
      </Animated.View>
      <Text style={styles.title}>Welcome to the User Page</Text>
      <View style={{ margin: 10 }}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <Button title="Booking Table" onPress={handleBooking} />
        </Animated.View>
      </View>
      <View style={{ margin: 10 }}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <Button title="Home Delivery" onPress={handleDelivery} />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 5,
  },
  homeButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333',
  },
});

export default UserPage;
