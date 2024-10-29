import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

const UserPage = ({ navigation }) => {
  const handleBooking = () => {
    // Navigate to booking page or handle booking logic
    console.log('Booking_Table');
    navigation.navigate('Booking_Table'); // Example navigation to a Booking Page
  };

  const handleDelivery = () => {
    // Handle home delivery logic
    console.log('Home_Delivery');
    navigation.navigate('Home_Delivery'); // Example navigation to a Delivery Page
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image 
        source={require('../assets/images/logo.png')} // Adjust the path as necessary
        style={styles.image} 
      />
      <Text>Welcome to the User Page</Text>
      <View style={{ margin: 10 }}>
        <Button title="Booking Table" onPress={handleBooking} />
      </View>
      <View style={{ margin: 10 }}>
        <Button title="Home Delivery" onPress={handleDelivery} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 300, // Set your desired width
    height: 300, // Set your desired height
    marginBottom: 20, // Space between image and text
  },
});

export default UserPage;
