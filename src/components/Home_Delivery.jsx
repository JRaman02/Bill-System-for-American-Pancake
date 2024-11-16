import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView, Image } from 'react-native';
import { CheckBox } from 'react-native-elements';
import RNPrint from 'react-native-print';

// Import images
const mapleButterImage = require('../assets/images/1.jpg');
const Dark = require('../assets/images/2.jpg');
const White = require('../assets/images/3.jpg');
const Coffee = require('../assets/images/4.jpg');
const Strawberry = require('../assets/images/5.jpg');
const Blueberry = require('../assets/images/6.jpg');
const Oreo_Fillings = require('../assets/images/7.jpg');
const Butter_Scotch = require('../assets/images/8.jpg');
const Cotton_Candy = require('../assets/images/9.jpg');
const KitKal_Loaded = require('../assets/images/10.jpg');

// Menu items
const menuItems = [
  { id: '1', name: 'Maple Butter', price: 50, image: mapleButterImage },
  { id: '2', name: 'Dark Chocolate Heaven', price: 50, image: Dark },
  { id: '3', name: 'White Chocolate Heaven', price: 60, image: White },
  { id: '4', name: 'Coffee Bytes', price: 60, image: Coffee },
  { id: '5', name: 'Strawberry', price: 60, image: Strawberry },
  { id: '6', name: 'Blueberry', price: 70, image: Blueberry },
  { id: '7', name: 'Oreo Fillings', price: 70, image: Oreo_Fillings },
  { id: '8', name: 'Butter Scotch', price: 70, image: Butter_Scotch },
  { id: '9', name: 'Cotton Candy', price: 60, image: Cotton_Candy },
  { id: '10', name: 'KitKal Loaded', price: 70, image: KitKal_Loaded },
];

const HomeDelivery = () => {
  const [Name, setProgramName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [address, setAddress] = useState('');
  const [selectedItems, setSelectedItems] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  const validateMobileNumber = (mobileNo) => {
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileNo || !mobileRegex.test(String(mobileNo))) {
      Alert.alert('Validation Error', 'Please enter a valid 10-digit mobile number');
      return false;
    }
    return true;
  };

  const validateForm = () => {
    if (!Name.trim()) {
      Alert.alert('Validation Error', 'Name is required');
      return false;
    }
    if (!validateMobileNumber(mobileNo)) {
      return false;
    }
    if (!address.trim()) {
      Alert.alert('Validation Error', 'Address is required');
      return false;
    }
    if (!Object.values(selectedItems).some(item => item)) {
      Alert.alert('Validation Error', 'Please select at least one pancake');
      return false;
    }
    return true;
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const calculateTotal = () => {
    return menuItems.reduce((total, item) => {
      if (selectedItems[item.id]) {
        return total + item.price;
      }
      return total;
    }, 0);
  };

  const handlePrint = async () => {
    const htmlContent = `
      <center><h1>American Pancake</h1>
      <p>Name: ${Name}</p>
      <p>Mobile No: ${mobileNo}</p>
      <p>Address: ${address}</p>
      <h2>Pancakes Item:</h2>
      <ul>
        ${menuItems
          .filter(item => selectedItems[item.id])
          .map(item => `<li>${item.name} - Rs. ${item.price.toFixed(2)}</li>`)
          .join('')}
      </ul>
      <h3>Total Amount: Rs. ${totalAmount.toFixed(2)}</h3></center>
    `;

    await RNPrint.print({ html: htmlContent });
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const total = calculateTotal();
      setTotalAmount(total);
      Alert.alert('Bill Summary', `Total Amount: Rs.${total.toFixed(2)}`, [
        { text: 'Print Bill', onPress: handlePrint },
        { text: 'OK', onPress: () => console.log('Order Submitted') },
      ]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image 
        source={require('../assets/images/logo.png')} // Adjust the path as necessary
        style={styles.img} 
      />
      <Text style={styles.title}>Home Delivery</Text>

      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={Name}
        onChangeText={setProgramName}
        placeholder="Enter Name"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Mobile No:</Text>
      <TextInput
        style={styles.input}
        value={mobileNo}
        onChangeText={setMobileNo}
        placeholder="Enter Mobile Number"
        keyboardType="phone-pad"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={address}
        onChangeText={setAddress}
        placeholder="Enter Address"
        placeholderTextColor="#888"
        multiline
      />

      <Text style={styles.subTitle}>Select Pancakes:</Text>

      {menuItems.map(item => (
        <View key={item.id} style={styles.itemContainer}>
          <Image source={item.image} style={styles.image} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>Rs. {item.price.toFixed(2)}</Text>
          </View>
          <CheckBox
            checked={!!selectedItems[item.id]}
            onPress={() => handleCheckboxChange(item.id)}
            checkedIcon={<Text style={styles.checkedIcon}>✅</Text>} 
            uncheckedIcon={<Text style={styles.uncheckedIcon}>☐</Text>}
          />
        </View>
      ))}

      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} color="#4CAF50" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  subTitle: {
    fontSize: 22,
    textAlign: 'center',
    marginVertical: 20,
    color: 'green',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    marginVertical: 30,
    borderRadius: 8,
    overflow: 'hidden',
  },
  checkedIcon: {
    fontSize: 24, 
    color: 'green', 
  },
  uncheckedIcon: {
    fontSize: 24, 
    color: 'red', 
  },
  img: {
    width: '100%', 
    height: 200,  
    marginBottom: 20, 
  },
  
});

export default HomeDelivery;
