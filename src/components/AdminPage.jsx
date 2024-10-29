import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

const AdminPage = ({ navigation }) => {
  // Function to handle Menu button press
  const handleMenuPress = (action) => {
    if (action === 'MenuListPage') {
      navigation.navigate('MenuListPage'); // Navigate to List of Menu
    } else if (action === 'AddMenuPage') {
      navigation.navigate('AddMenuPage'); // Navigate to Add Menu Page
    }
  };

  // Function to handle Add Table button press
  const handleAddTablePress = () => {
    navigation.navigate('AddTablePage'); // Navigate to Add Table Page
  };

  // Function to handle Add Pancake button press
  const handlePancakePress = () => {
    navigation.navigate('PancakePage'); // Navigate to Add Pancake Page
  };

  return (
    <View style={styles.container}>
      {/* Add Image at the top */}
      <Image 
        source={require('../assets/images/logo.png')} // Adjust the path as necessary
        style={styles.image} 
      />
      <Text style={styles.title}>Welcome to the Admin Page</Text>

      <View style={styles.buttonContainer}>
        <Button title="View Menu" onPress={() => handleMenuPress('MenuListPage')} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Add Menu" onPress={() => handleMenuPress('AddMenuPage')} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Add Table" onPress={handleAddTablePress} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Pancake" onPress={handlePancakePress} />
      </View>
    </View>
  );
};

// Basic styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
  },
  image: {
    width: '100%', // Adjust the width to fit the container
    height: 200,   // Adjust the height as necessary
    marginBottom: 20, // Add some space below the image
  },
});

export default AdminPage;
