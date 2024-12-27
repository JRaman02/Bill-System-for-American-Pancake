import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ConfirmationMessage = ({ route }) => {
  const { bookingData } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Confirmed!</Text>
      <Text style={styles.text}>Name: {bookingData.name}</Text>
      <Text style={styles.text}>Mobile No: {bookingData.mobile_no}</Text>
      <Text style={styles.text}>Table No: {bookingData.table_no}</Text>
      <Text style={styles.text}>Date: {bookingData.date}</Text>
      <Text style={styles.text}>Time: {bookingData.time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  text: { fontSize: 18, marginBottom: 10 },
});

export default ConfirmationMessage;
