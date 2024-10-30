import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, FlatList } from 'react-native';

const RecipeDetailScreen = ({ route }) => {
  const { recipe } = route.params || {};
  const [restaurantData, setRestaurantData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/restaurants');
        const data = await response.json();
        setRestaurantData(data);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const renderRestaurantItem = ({ item }) => (
    <View style={styles.restaurantItem}>
      <Image source={{ uri: item.image }} style={styles.restaurantImage} />
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.restaurantDetails}>Rating: {item.rating}</Text>
        <Text style={styles.restaurantDetails}>{item.time}</Text>
        <Text style={styles.restaurantDetails}>{item.cuisine}</Text>
        <Text style={styles.restaurantDiscount}>{item.discount}</Text>
        <Text style={styles.restaurantPrice}>{item.price}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {recipe ? (
        <>
          {recipe.image && <Image source={{ uri: recipe.image }} style={styles.image} />}
          <Text style={styles.title}>{recipe.title || "No Title Available"}</Text>
          
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <View style={styles.ingredientsContainer}>
            <FlatList
              data={recipe.ingredients || []}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <Text style={styles.ingredient}>{item}</Text>}
            />
          </View>
          
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.instructions}>{recipe.instructions || "No instructions available."}</Text>

          <Text style={styles.sectionTitle}>Related Restaurants</Text>
          {loading ? (
            <Text>Loading restaurants...</Text>
          ) : (
            <FlatList
              data={restaurantData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderRestaurantItem}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </>
      ) : (
        <Text style={styles.errorText}>No recipe found.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  ingredientsContainer: {
    marginVertical: 8,
  },
  ingredient: {
    fontSize: 16,
    marginVertical: 2,
  },
  instructions: {
    fontSize: 16,
    marginVertical: 8,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  restaurantItem: {
    flexDirection: 'row',
    marginVertical: 10,
    paddingRight: 10,
  },
  restaurantImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  restaurantInfo: {
    marginLeft: 10,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  restaurantDetails: {
    fontSize: 14,
    color: '#666',
  },
  restaurantDiscount: {
    fontSize: 14,
    color: 'green',
  },
  restaurantPrice: {
    fontSize: 14,
    color: '#333',
  },
});

export default RecipeDetailScreen;
