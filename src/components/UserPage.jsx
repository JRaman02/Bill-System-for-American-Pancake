import React, { useEffect, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated } from 'react-native';

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
});

export default UserPage;
