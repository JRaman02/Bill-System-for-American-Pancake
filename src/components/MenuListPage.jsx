import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, Pressable } from 'react-native';
import { HomeIcon } from 'react-native-heroicons/outline';

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

const MenuListPage = ({ navigation }) => {  // Make sure `navigation` is passed as a prop
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.pancakeName}>{item.name}</Text>
      <Text style={styles.price}>Rs: {item.price.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('Home')} style={styles.home}>
          <HomeIcon size={28} color="black" />
        </Pressable>
      </View>
      <Image 
        source={require('../assets/images/logo.png')} // Adjust the path as necessary
        style={styles.img} 
      />
      <Text style={styles.title}>Pancake Menu</Text>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  pancakeName: {
    fontSize: 18,
    flex: 1,
  },
  price: {
    fontSize: 16,
    color: '#555',
  },
  img: {
    width: 300, // Set your desired width
    height: 200, // Set your desired height
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 10,
  },
  home: {
    marginLeft: 10,
  },
});

export default MenuListPage;
