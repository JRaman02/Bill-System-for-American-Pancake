import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const RecipeDetailScreen = () => {
  const route = useRoute();
  const { restaurant } = route.params || {}; // Access restaurant data safely

  if (!restaurant) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Restaurant data not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={restaurant.image} style={styles.image} />
      <Text style={styles.name}>{restaurant.name}</Text>
      <Text style={styles.rating}>⭐ {restaurant.rating}</Text>
      <Text style={styles.price}>{restaurant.price}</Text>
      <Text style={styles.time}>Delivery Time: {restaurant.time}</Text>
      {/* Add more details or any other relevant information */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  rating: {
    fontSize: 18,
    color: 'gray',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 16,
    color: 'gray',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 18,
  },
});

export default RecipeDetailScreen;
