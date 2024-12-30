import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';

const MenuListPage = ({ navigation }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('http://192.168.29.148:8000/pancake_api/pancake/');
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://192.168.29.148:8000/pancake_api/pancake/${id}/`, {
        method: 'DELETE',
      });
      setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const currentItem = menuItems.find((item) => item.id === id);
      if (!currentItem) {
        throw new Error('Item not found in state.');
      }

      const completeData = { ...currentItem, ...updatedData };

      if (typeof completeData.price === 'string') {
        completeData.price = parseFloat(completeData.price);
      }

      if (isNaN(completeData.price)) {
        throw new Error('Price must be a valid number.');
      }

      const response = await fetch(`http://192.168.29.148:8000/pancake_api/pancake/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completeData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('API Error:', errorMessage);
        throw new Error('Failed to update the item: ' + errorMessage);
      }

      const updatedItem = await response.json();
      setMenuItems((prevItems) =>
        prevItems.map((item) => (item.id === id ? updatedItem : item))
      );
    } catch (error) {
      console.error('Error updating menu item:', error);
    }
  };

  const handleDeleteConfirmation = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => handleDelete(id),
          style: 'destructive',
        },
      ]
    );
  };

  const handleUpdateConfirmation = (item) => {
    Alert.alert(
      'Confirm Update',
      'Are you sure you want to update this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Update',
          onPress: () => navigation.navigate('UpdateMenuPage', { pancake: item }),
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.pancakeName}>{item.name}</Text>
        <Text style={styles.price}>₹ {item.price}</Text>
        <Text style={styles.rating}>Rating: {item.rating} ⭐</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <Pressable
          onPress={() => handleUpdateConfirmation(item)}
          style={styles.updateButton}
        >
          <Text style={styles.buttonText}>Update</Text>
        </Pressable>
        <Pressable
          onPress={() => handleDeleteConfirmation(item.id)}
          style={styles.deleteButton}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
 <ScrollView>
     <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('AdminPage')} style={styles.homeButton}>
          <ArrowLeftIcon size={28} color="#0a0a0a" />
        </Pressable>
      </View>
      <Image source={require('../assets/images/logo.png')} style={styles.img} />
      <Text style={styles.title}>Pancake Menu</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={menuItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
 </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    padding: 10,
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
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  pancakeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#555',
  },
  rating: {
    fontSize: 14,
    color: '#888',
  },
  img: {
    width: 150,
    height: 100,
    alignSelf: 'center', // Centers the image horizontally
    marginVertical: 3,  // Adds some vertical spacing
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  homeButton: {
    marginLeft: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MenuListPage;
