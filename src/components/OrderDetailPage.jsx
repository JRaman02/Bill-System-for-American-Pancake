import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';

const OrderDetailPage = () => {
  const route = useRoute();
  const { orderId } = route.params;
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch(`http://192.168.29.148:8000/pancake_api/orders/${orderId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }
        const data = await response.json();
        console.log('Fetched Order Data:', data); // Debugging
        setOrderData({
          ...data,
          pancakes: data.pancakes || [], // Ensure pancakes is always an array
        });
        setLoading(false); // Stop loading after data is fetched
      } catch (err) {
        setError(err.message);
        setLoading(false); // Stop loading if there's an error
      }
    };

    // Simulate a 1-second delay before fetching data
    setTimeout(fetchOrderData, 1000);

  }, [orderId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!orderData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No order data found.</Text>
      </View>
    );
  }

  // Calculate total amount with fallback values for price and quantity
  const totalAmount = (orderData.pancakes || [])
    .reduce((sum, pancake) => sum + (pancake.price || 0) * (pancake.quantity || 0), 0)
    .toFixed(2);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Order Details</Text>

      {/* Total amount displayed at the top */}
      <Text style={styles.total}>Total Pancakes Price: Rs. {totalAmount}</Text>

      <View style={styles.orderInfo}>
        <Text style={styles.orderDetails}>Customer Name: {orderData.customer_name}</Text>
        <Text style={styles.orderDetails}>Mobile No: {orderData.mobile_no}</Text>
        <Text style={styles.orderDetails}>Address: {orderData.customer_address}</Text>
      </View>

      <Text style={styles.subTitle}>Selected Pancakes:</Text>
      {orderData.pancakes && orderData.pancakes.length > 0 ? (
        orderData.pancakes.map((pancake, index) => (
          <View key={pancake.id} style={styles.pancakeItem}>
            <Image source={{ uri: pancake.image_url }} style={styles.pancakeImage} />
            <Text style={styles.pancakeName}>
              {index + 1}. {pancake.name}
            </Text>
            <View style={styles.pancakeDetailsContainer}>
              <Text style={styles.pancakeDetails}>Quantity: {pancake.quantity || 0}</Text>
              <Text style={styles.pancakeDetails}>Rating: {pancake.rating || 'N/A'}</Text>
              <Text style={styles.pancakeDetails}>Cuisine: {pancake.cuisine || 'N/A'}</Text>
              <Text style={styles.pancakeDetails}>Discount: {pancake.discount || 'N/A'}</Text>
              <Text style={styles.pancakeDetails}>Price: Rs. {pancake.price || 0}</Text>
              
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noPancakes}>No pancakes selected.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  total: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  orderInfo: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  orderDetails: {
    fontSize: 18,
    marginVertical: 5,
    color: '#555',
  },
  subTitle: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 10,
    color: '#4CAF50',
  },
  pancakeItem: {
    marginVertical: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  pancakeImage: {
    width: '90%',
    height: 200,
    borderRadius: 10,
    marginBottom: 12,
  },
  pancakeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  pancakeDetailsContainer: {
    marginTop: 10,
    paddingLeft: 10,
  },
  pancakeDetails: {
    fontSize: 16,
    marginTop: 5,
    color: '#555',
  },
  noPancakes: {
    textAlign: 'center',
    fontSize: 18,
    color: '#999',
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#f44336',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#4CAF50',
    marginTop: 10,
  },
});

export default OrderDetailPage;
