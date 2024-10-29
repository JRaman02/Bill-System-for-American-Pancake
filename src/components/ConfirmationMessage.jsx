import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ConfirmationMessage = ({ route, navigation }) => {
  const { bookingData } = route.params; // Retrieve the booking data passed from BookingTable

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Confirmation</Text>
      <Text>Name: {bookingData.name}</Text>
      <Text>Mobile No: {bookingData.mobile}</Text>
      <Text>Table No: {bookingData.tableNo}</Text>
      <Text>Date: {bookingData.date}</Text>
      <Text>Time: {bookingData.time}</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ConfirmationMessage;
