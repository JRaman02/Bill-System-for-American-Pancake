import React, { useState, useEffect, useRef } from 'react';
import { FlatList, View, Text, Image, StyleSheet, Button, Pressable, Alert, Animated, ActivityIndicator, ScrollView } from 'react-native';
import RNPrint from 'react-native-print';
import { HomeIcon } from 'react-native-heroicons/outline';

const logo = require('../assets/images/logo.png'); // Your logo image

const PancakePage = ({ navigation }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const totalBillAnim = useRef(new Animated.Value(0)).current;
  const [animatedBill, setAnimatedBill] = useState(0);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://192.168.29.148:8000/pancake_api/pancake/');
        const data = await response.json();
        const formattedData = data.map((item) => ({
          id: item.id.toString(),
          name: item.name,
          price: item.price,
          image: { uri: item.image_url },
        }));
        setMenuItems(formattedData);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch menu items: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  useEffect(() => {
    totalBillAnim.addListener(({ value }) => setAnimatedBill(Math.round(value)));

    Animated.timing(totalBillAnim, {
      toValue: calculateTotalBill(),
      duration: 300,
      useNativeDriver: true,
    }).start();

    return () => {
      totalBillAnim.removeAllListeners();
    };
  }, [selectedItems]);

  const addItemToBill = (item) => {
    setSelectedItems((prevItems) => [...prevItems, item]);
  };

  const calculateTotalBill = () => {
    return selectedItems.reduce((total, item) => total + item.price, 0);
  };

  const formatBill = () => {
    const itemList = selectedItems
      .map((item) => `${item.name} - Rs ${item.price}`)
      .join('<br/>');
    const totalAmount = calculateTotalBill();
    return `
      <center>
        <h1>Bill</h1>
        <img src="${logo}" style="width: 100px; height: auto;" />
        <p>Items:</p>
        <p>${itemList}</p>
        <p><strong>Total: Rs ${totalAmount}</strong></p>
      </center>
    `;
  };

  const generateBillPdf = async () => {
    const billHtml = formatBill();
    try {
      await RNPrint.print({ html: billHtml });
    } catch (error) {
      Alert.alert('Error', 'Failed to generate PDF: ' + error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('AdminPage')} style={styles.home}>
          <HomeIcon size={28} color="black" />
        </Pressable>
      </View>

      <Animated.Image
        source={logo}
        style={[
          styles.img,
          {
            transform: [
              {
                scale: totalBillAnim.interpolate({
                  inputRange: [0, calculateTotalBill()],
                  outputRange: [1, 1.2],
                }),
              },
            ],
          },
        ]}
      />

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>Rs {item.price}</Text>
            <Pressable style={styles.addButton} onPress={() => addItemToBill(item)}>
              <Text style={styles.addButtonText}>Add</Text>
            </Pressable>
          </View>
        )}
      />

      <View style={styles.billContainer}>
        <Text style={styles.totalBill}>
          Total Bill: Rs {animatedBill}
        </Text>
        <Button title="Generate PDF Bill" onPress={generateBillPdf} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
  },
  home: {
    marginRight: 10,
  },
  img: {
    width: 180,
    height: 100,
    alignSelf: 'center',
    marginVertical: 20,
  },
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 8,
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: '#333',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginRight: 10,
  },
  addButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  billContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 15,
    backgroundColor: '#4CAF50',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  totalBill: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
});

export default PancakePage;
