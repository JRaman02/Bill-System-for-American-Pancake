import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';


// Import images
const images = [
  require('../assets/images/1.jpg'),
  require('../assets/images/2.jpg'),
  require('../assets/images/3.jpg'),
  require('../assets/images/4.jpg'),
  require('../assets/images/5.jpg'),
  require('../assets/images/6.jpg'),
  require('../assets/images/7.jpg'),
  require('../assets/images/8.jpg'),
  require('../assets/images/9.jpg'),
  require('../assets/images/10.jpg'),
];

// Sample data for restaurants
const restaurantData = [
  { id: '1', 
    name: 'Maple Butter', 
    rating: 4.6, 
    time: '30-35 mins',  
    price: 'UPTO ₹50', 
    image: images[0] 
  },
  
  { id: '2', 
    name: 'Dark Chocolate Heaven', 
    rating: 4.2, 
    time: '30-35 mins',  
    price: 'UPTO ₹50', 
    image: images[1] 
  },

  { id: '3', 
    name: 'White Chocolate Heaven', 
    rating: 4.2, 
    time: '30-35 mins',  
    price: 'UPTO ₹60', 
    image: images[2] 
  },

  { id: '4', 
    name: 'Coffee Bytes', 
    rating: 4.2, 
    time: '30-35 mins',  
    price: 'UPTO ₹60', 
    image: images[3] 
  },

  { id: '5', 
    name: 'Strawberry', 
    rating: 4.2, 
    time: '30-35 mins',  
    price: 'UPTO ₹60', 
    image: images[4] 
  },

  { id: '6', 
    name: 'Blueberry', 
    rating: 4.2, 
    time: '30-35 mins',  
    price: 'UPTO ₹70', 
    image: images[5] 
  },
  { id: '7', 
    name: 'Oreo Fillings', 
    rating: 4.2, 
    time: '30-35 mins',  
    price: 'UPTO ₹70', 
    image: images[6] 
  },
  { id: '8', 
    name: 'Butter Scotch', 
    rating: 4.2, 
    time: '30-35 mins',  
    price: 'UPTO ₹70', 
    image: images[7] 
  },
  { id: '9', 
    name: 'Cotton Candy', 
    rating: 4.2, 
    time: '30-35 mins',  
    price: 'UPTO ₹60', 
    image: images[8] 
  },
  { id: '10', 
    name: 'KitKal Loaded', 
    rating: 4.2, 
    time: '30-35 mins',  
    price: 'UPTO ₹70', 
    image: images[9] 
  },
  
];

const RestaurantCard = ({ restaurant }) => {
  const navigation = useNavigation();

  return (
    <Pressable style={styles.card} onPress={() => navigation.navigate('RecipeDetailScreen')}>
      <Image source={restaurant.image} style={styles.image} />
      <Text style={styles.discount}>{restaurant.discount}</Text>
      <Text style={styles.name}>{restaurant.name}</Text>
      <Text style={styles.rating}>⭐ {restaurant.rating} • {restaurant.time}</Text>
      {restaurant.cuisine && <Text style={styles.cuisine}>{restaurant.cuisine}</Text>}
      {restaurant.location && <Text style={styles.location}>{restaurant.location}</Text>}
    </Pressable>
  );
};


export default function RestaurantListScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/logo.png')} // Adjust the path as necessary
        style={styles.img} 
      />
      <FlatList
        data={restaurantData}
        renderItem={({ item }) => <RestaurantCard restaurant={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    margin: 10,
    width: wp('42%'),
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: hp('15%'),
    borderRadius: 10,
  },
  discount: {
    position: 'absolute',
    bottom: hp('10%'),
    left: '5%',
    backgroundColor: '#f7f2f2',
    color: '#0a0000',
    padding: 4,
    borderRadius: 5,
    fontSize: 12,
    top:110,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  rating: {
    fontSize: 14,
    color: 'gray',
  },
  cuisine: {
    fontSize: 12,
    color: 'gray',
  },
  location: {
    fontSize: 12,
    color: 'gray',
  },
  loginButton: {
    position: 'absolute',
    top: '2%',
    right: '4%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#3498db',
  },
  loginText: {
    color: 'white',
    fontSize: 16,
  },
  img: {
    width: '100%', 
    height: 200,  
    marginBottom: 20,
  },
});
