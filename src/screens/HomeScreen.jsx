import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Pressable, Animated, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const RestaurantCard = ({ restaurant, index }) => {
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(-wp('100%'))).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      delay: index * 100, // Adds staggered animation
      useNativeDriver: true,
    }).start();
  }, [slideAnim, index]);

  return (
    <Pressable 
      style={styles.card} 
      onPress={() => navigation.navigate('RecipeDetailScreen', { restaurantId: restaurant.id })}  
    >
      <Animated.View style={[styles.animatedCard, { transform: [{ translateX: slideAnim }] }]} >
        <Image 
          source={{ uri: restaurant.image_url }} // Use image_url from API response
          style={styles.image} 
          onError={() => console.error('Image failed to load')} // Log errors if images fail
        />
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={styles.rating}>⭐ {restaurant.rating} • {restaurant.time}</Text>
      </Animated.View>
    </Pressable>
  );
};

const RestaurantListScreen = () => {
  const navigation = useNavigation();
  const [restaurantData, setRestaurantData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('http://192.168.29.148:8000/pancake_api/pancake/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setRestaurantData(data);
        } else {
          throw new Error('Response is not JSON');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/logo.png')} 
        style={styles.img} 
      />
      <FlatList
        data={restaurantData}
        renderItem={({ item, index }) => <RestaurantCard restaurant={item} index={index} />}
        keyExtractor={(item) => item.id.toString()}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    textAlign: 'center',
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

export default RestaurantListScreen;
