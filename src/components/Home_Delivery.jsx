import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, ScrollView, Image, Animated, TouchableOpacity, Pressable } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

const HomeDelivery = () => {
  const [Name, setProgramName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [address, setAddress] = useState('');
  const [selectedItems, setSelectedItems] = useState({});
  const [menuItems, setMenuItems] = useState([]);

  const logoAnim = useRef(new Animated.Value(0)).current;
  const [buttonScale] = useState(new Animated.Value(1));
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(logoAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://192.168.29.148:8000/pancake_api/pancake/');
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        Alert.alert('Error', `Failed to load menu items: ${error.message}`);
      }
    };

    fetchMenuItems();
  }, []);

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
    if (!Object.values(selectedItems).some((item) => item.selected)) {
      Alert.alert('Validation Error', 'Please select at least one pancake');
      return false;
    }
    return true;
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) => {
      const updatedItems = { ...prev };
      updatedItems[id] = updatedItems[id] || { selected: false, quantity: 0 };
    
      // Toggle selection status and set quantity to 1 when selected
      updatedItems[id].selected = !updatedItems[id].selected;
      if (updatedItems[id].selected) {
        updatedItems[id].quantity = 1; // Default quantity to 1 when checked
      }
      return updatedItems;
    });
  };

  const handleQuantityChange = (id, increment) => {
    setSelectedItems(prev => {
      const updatedItems = { ...prev };
      updatedItems[id] = updatedItems[id] || { selected: false, quantity: 0 };
      const newQuantity = Math.max(0, updatedItems[id].quantity + increment);
      updatedItems[id].quantity = newQuantity;
      return updatedItems;
    });
  };

  const handleSubmit = async () => {
    console.log("Submit button pressed"); // Debugging line
    
    if (validateForm()) {
      const pancakes = Object.entries(selectedItems)
        .filter(([_, item]) => item.selected)
        .map(([id, item]) => ({ id: parseInt(id), quantity: item.quantity }));
  
      const orderData = {
        customer_name: Name,
        mobile_no: mobileNo,
        customer_address: address,
        delivery_time: new Date().toISOString(),
        pancakes, // Pancakes array with id and quantity
      };
  
      console.log("Order Data:", orderData); // Debugging line to inspect payload
  
      try {
        const response = await fetch('http://192.168.29.148:8000/pancake_api/orders/create/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });
  
        const result = await response.json();
        console.log("API Response:", result); // Debugging line to log API response
  
        if (response.ok) {
          Alert.alert('Order Submitted', `Order ID: ${result.id}`);
        } else {
          Alert.alert('Error', `Failed to submit order. ${result.message || 'Please try again.'}`);
        }
      } catch (error) {
        console.error('Error occurred:', error);
        Alert.alert('Error', `An error occurred: ${error.message}`);
      }
    }
  };
  

  const handleButtonPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handleButtonPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.Image
        source={require('../assets/images/logo.png')}
        style={[styles.img, {
          transform: [{
            translateY: logoAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [-200, 0],
            }),
          }],
        }]}
      />
      <Pressable onPress={() => navigation.navigate('UserPage')} style={styles.homeButton}>
        <ArrowLeftIcon size={28} color="#fff" />
      </Pressable>
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

      {menuItems.length > 0 ? (
        menuItems.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Image source={{ uri: item.image_url }} style={styles.image} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>Rs.{item.price}</Text>
            </View>
            <CheckBox
              checked={!!selectedItems[item.id]?.selected}
              onPress={() => handleCheckboxChange(item.id)}
              checkedIcon={<Text style={styles.checkedIcon}>☑</Text>}
              uncheckedIcon={<Text style={styles.uncheckedIcon}>☐</Text>}
            />
            {selectedItems[item.id]?.selected && (
              <View style={styles.quantityControls}>
                <TouchableOpacity onPress={() => handleQuantityChange(item.id, -1)}>
                  <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{selectedItems[item.id]?.quantity}</Text>
                <TouchableOpacity onPress={() => handleQuantityChange(item.id, 1)}>
                  <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))
      ) : (
        <Text>Loading menu items...</Text>
      )}

      <View style={styles.buttonContainer}>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity onPress={handleSubmit}>
            <View style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
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
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  checkedIcon: {
    fontSize: 24,
    color: 'green',
  },
  uncheckedIcon: {
    fontSize: 24,
    color: 'red',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 24,
    padding: 5,
    color: '#4CAF50',
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  img: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  homeButton: { 
    position: "absolute",
    top: 20,
    left: 20,
    padding: 1,
    backgroundColor: "#4CAF50",
    borderRadius: 30 
  },
});

export default HomeDelivery;
