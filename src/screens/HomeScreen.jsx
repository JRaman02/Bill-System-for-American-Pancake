import React, { useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Pressable, Animated } from 'react-native';
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
  require('../assets/images/11.jpg'),
  require('../assets/images/12.jpg'),
  require('../assets/images/13.jpg'),
  require('../assets/images/14.jpg'),
  require('../assets/images/15.jpg'),
  require('../assets/images/16.jpg'),
  require('../assets/images/17.jpg'),
  require('../assets/images/18.jpg'),
  require('../assets/images/19.jpg'),
  require('../assets/images/20.jpg'),
  require('../assets/images/21.jpg'),
  require('../assets/images/22.jpg'),
];

// Sample data for restaurants
const restaurantData = [
  { 
    id: '1', 
    name: 'Maple Butter', 
    rating: 4.6, 
    time: '30-35 mins', 
    price: 'UPTO ₹50', 
    image: images[0] 
  },

  { 
    id: '2', 
    name: 'Dark Chocolate Heaven', 
    rating: 4.2, 
    time: '30-35 mins', 
    price: 'UPTO ₹50', 
    image: images[1] 
  },

  { 
    id: '3', 
    name: 'White Chocolate Heaven', 
    rating: 4.2, 
    time: '30-35 mins', 
    price: 'UPTO ₹60', 
    image: images[2] 
  },

  { 
    id: '4', 
    name: 'Coffee Bytes', 
    rating: 4.2, 
    time: '30-35 mins', 
    price: 'UPTO ₹60', 
    image: images[3] 
  },

  { 
    id: '5', 
    name: 'Strawberry', 
    rating: 4.2, 
    time: '30-35 mins', 
    price: 'UPTO ₹60', 
    image: images[4] 
  },

  { 
    id: '6', 
    name: 'Blueberry', 
    rating: 4.2, 
    time: '30-35 mins', 
    price: 'UPTO ₹70', 
    image: images[5] 
  },

  { 
    id: '7', 
    name: 'Oreo Fillings', 
    rating: 4.2, 
    time: '30-35 mins', 
    price: 'UPTO ₹70', 
    image: images[6] 
  },

  { 
    id: '8', 
    name: 'Butter Scotch', 
    rating: 4.2, 
    time: '30-35 mins', 
    price: 'UPTO ₹70', 
    image: images[7] 
  },

  { 
    id: '9', 
    name: 'Cotton Candy', 
    rating: 4.2, 
    time: '30-35 mins', 
    price: 'UPTO ₹60', 
    image: images[8] 
  },

  { 
    id: '10', 
    name: 'KitKal Loaded', 
    rating: 4.2, 
    time: '30-35 mins', 
    price: 'UPTO ₹70', 
    image: images[9] 
  },

  { 
    id: '11', 
    name: 'Nutella delight', 
    rating: 4.6, 
    time: '30-35 mins', 
    price: 'UPTO ₹50', 
    image: images[10] 
  },

  { 
    id: '12', 
    name: 'Bubblegum', 
    rating: 4.2, 
    time: '30-35 mins', 
    price: 'UPTO ₹50', 
    image: images[11] 
  },

  { 
    id: '13', 
    name: 'Triple bytes', 
    rating: 4.2, 
    time: '30-35 mins', 
    price: 'UPTO ₹60', 
    image: images[12] 
  },

  { 
    id: '14', 
    name: 'Red Velvet Cheesecake', 
    rating: 4.2, 
    time: '30-35 mins', 
    price: 'UPTO ₹60', 
    image: images[13] 
  },

  { 
    id: '15', 
    name: 'Lotus Biscoff', 
    rating: 4.2, 
    time: '30-35 mins', 
    price: 'UPTO ₹60', 
    image: images[14] 
  },

  { 
    id: '16', 
    name: 'Dark Chocolate', 
    rating: 4.2, 
    time: '30-35 mins', 
    price: 'UPTO ₹70', 
    image: images[15] 
  },

  { 
    id: '17', 
    name: 'White Chocolate', 
    rating: 4.2, 
    time: '30-35 mins', 
    price: 'UPTO ₹70', 
    image: images[16] 
  },

  { 
    id: '18', 
    name: 'Milk chocolate', 
    rating: 4.2, 
    time: '30-35 mins', 
    price: 'UPTO ₹70', 
    image: images[17] 
  },

  { 
    id: '19', 
    name: 'Oreo Loaded', 
    rating: 4.2, 
    time: '30-35 mins', 
    price: 'UPTO ₹60', 
    image: images[18] 
  },

  { 
    id: '20', 
    name: 'Nutella', 
    rating: 4.2, 
    time: '30-35 mins', 
    price: 'UPTO ₹70', 
    image: images[19] 
  },

  { 
    id: '21', 
    name: 'Death by chocolate', 
    rating: 4.2, 
    time: '30-35 mins', 
    price: 'UPTO ₹70', 
    image: images[20] 
  },

  { 
    id: '22', 
    name: 'Lotus Biscoff', 
    rating: 4.2, 
    time: '30-35 mins', 
    price: 'UPTO ₹70', 
    image: images[21] 
  },
];

const RestaurantCard = ({ restaurant, index }) => {
  const navigation = useNavigation();

  // Create an animated value for the slide animation
  const slideAnim = useRef(new Animated.Value(-wp('100%'))).current; // Start off-screen to the left

  useEffect(() => {
    // Animate the slide-in effect when the component is mounted
    Animated.timing(slideAnim, {
      toValue: 0, // Slide to its original position
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  return (
    <Pressable 
      style={styles.card} 
      onPress={() => navigation.navigate('RecipeDetailScreen', { restaurant })}>
      <Animated.View style={[styles.animatedCard, { transform: [{ translateX: slideAnim }] }]}>
        <Image source={restaurant.image} style={styles.image} />
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={styles.rating}>⭐ {restaurant.rating} • {restaurant.time}</Text>
      </Animated.View>
    </Pressable>
  );
};

export default function RestaurantListScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/logo.png')} 
        style={styles.img} 
      />
      <FlatList
        data={restaurantData}
        renderItem={({ item, index }) => <RestaurantCard restaurant={item} index={index} />}
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
  animatedCard: {
    width: '100%',
  },
  image: {
    width: '100%',
    height: hp('15%'),
    borderRadius: 10,
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