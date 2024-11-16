import React, { useState } from 'react';
import { FlatList, View, Text, Image, StyleSheet, Button, Pressable, Alert } from 'react-native';
import RNPrint from 'react-native-print';
import { HomeIcon } from 'react-native-heroicons/outline';

// Image imports
const mapleButterImage = require('../assets/images/1.jpg');
const darkChocolateImage = require('../assets/images/2.jpg');
const whiteChocolateImage = require('../assets/images/3.jpg');
const coffeeImage = require('../assets/images/4.jpg');
const strawberryImage = require('../assets/images/5.jpg');
const blueberryImage = require('../assets/images/6.jpg');
const oreoFillingsImage = require('../assets/images/7.jpg');
const butterScotchImage = require('../assets/images/8.jpg');
const cottonCandyImage = require('../assets/images/9.jpg');
const kitKatLoadedImage = require('../assets/images/10.jpg');

// Logo image for the PDF bill (converted to base64 or external URL if possible)
const logo = require('../assets/images/logo.png'); // Update with local image if needed

// Menu items
const menuItems = [
  { id: '1', name: 'Maple Butter', price: 50, image: mapleButterImage },
  { id: '2', name: 'Dark Chocolate Heaven', price: 50, image: darkChocolateImage },
  { id: '3', name: 'White Chocolate Heaven', price: 60, image: whiteChocolateImage },
  { id: '4', name: 'Coffee Bytes', price: 60, image: coffeeImage },
  { id: '5', name: 'Strawberry', price: 60, image: strawberryImage },
  { id: '6', name: 'Blueberry', price: 70, image: blueberryImage },
  { id: '7', name: 'Oreo Fillings', price: 70, image: oreoFillingsImage },
  { id: '8', name: 'Butter Scotch', price: 70, image: butterScotchImage },
  { id: '9', name: 'Cotton Candy', price: 60, image: cottonCandyImage },
  { id: '10', name: 'KitKat Loaded', price: 70, image: kitKatLoadedImage },
];

const PancakePage = ({ navigation }) => {
  const [selectedItems, setSelectedItems] = useState([]);

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
      await RNPrint.print({
        html: billHtml,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to generate PDF: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('Home')} style={styles.home}>
          <HomeIcon size={28} color="black" />
        </Pressable>
      </View>
      <Image 
        source={require('../assets/images/logo.png')} // Update with your actual logo path
        style={styles.img} 
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
        <Text style={styles.totalBill}>Total Bill: Rs {calculateTotalBill()}</Text>
        <Button title="Generate PDF Bill" onPress={generateBillPdf} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    flex: 1,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  addButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
  },
  billContainer: {
    padding: 20,
    alignItems: 'center',
  },
  totalBill: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  img: {
    width: '100%', 
    height: 200,  
    marginBottom: 20, 
  },
});

export default PancakePage;
