import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, ActivityIndicator, ScrollView } from "react-native";

const TPPage = ({ route, navigation }) => {
  const [bookingDetails, setBookingDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch booking details from the API
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch("http://192.168.29.148:8000/pancake_api/tablebooking/");
        if (!response.ok) {
          throw new Error("Failed to fetch booking details.");
        }
        const data = await response.json();
        setBookingDetails(data); // Assuming the API returns an array of bookings
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading booking details...</Text>
      </View>
    );
  }

  if (error || bookingDetails.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {error || "Error: No booking details found!"}
        </Text>
        <Button
          title="Back to Home"
          onPress={() => navigation.navigate("UserPage")}
        />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Booking Details</Text>
      {bookingDetails.map((booking, index) => (
        <View key={index} style={styles.bookingCard}>
          <Text style={styles.detail}>Name: {booking.name}</Text>
          <Text style={styles.detail}>Mobile No: {booking.mobile_no}</Text>
          <Text style={styles.detail}>Table No: {booking.table_no}</Text>
          <Text style={styles.detail}>Date: {booking.date}</Text>
          <Text style={styles.detail}>Time: {booking.time}</Text>
        </View>
      ))}
      <Button
        title="Back to Home"
        onPress={() => navigation.navigate("AdminPage")}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" },
  scrollContainer: { padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  bookingCard: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  detail: { fontSize: 18, marginBottom: 5 },
});

export default TPPage;
