import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';

const AdminPage = ({ navigation }) => {
  // Animated values
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Animation sequence for logo
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    // Staggered button animations
    Animated.stagger(300, [
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 1000,
        delay: 500,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 500,
        delay: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Navigation handlers
  const handleMenuPress = (action) => {
    if (action === 'MenuListPage') {
      navigation.navigate('MenuListPage');
    } else if (action === 'AddMenuPage') {
      navigation.navigate('AddMenuPage');
    }
  };

  const handleAddTablePress = () => {
    navigation.navigate('AddTablePage');
  };

  const handlePancakePress = () => {
    navigation.navigate('PancakePage');
  };

  const handleViewTablePress = () => {
    navigation.navigate('TPPage');
  };

  const handleHomeDeliveryPress = () => {
    navigation.navigate('OrderListPage');
  };

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('Login')} style={styles.home}>
          <ArrowLeftIcon size={28} color="black" />
        </Pressable>
      </View>

      {/* Add Animated Image at the top */}
      <Animated.Image
        source={require('../assets/images/logo.png')} // Adjust the path as necessary
        style={[styles.image, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}
      />
      <Text style={styles.title}>Welcome to the Admin Page</Text>

      {/* Button Grid */}
      <View style={styles.buttonGrid}>
        {['View Menu', 'Add Menu', 'Add Table', 'Table Booking', 'Home Delivery', 'Pancake'].map(
          (title, index) => (
            <Animated.View
              key={title}
              style={[
                styles.buttonWrapper,
                {
                  opacity: buttonOpacity,
                  transform: [
                    { scale: buttonScale },
                    {
                      rotate: buttonOpacity.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['-15deg', '0deg'],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  pressed && styles.buttonPressed,
                ]}
                onPress={() => {
                  if (title === 'View Menu') handleMenuPress('MenuListPage');
                  else if (title === 'Add Menu') handleMenuPress('AddMenuPage');
                  else if (title === 'Add Table') handleAddTablePress();
                  else if (title === 'Table Booking') handleViewTablePress();
                  else if (title === 'Home Delivery') handleHomeDeliveryPress();
                  else if (title === 'Pancake') handlePancakePress();
                }}
              >
                <Text style={styles.buttonText}>{title}</Text>
              </Pressable>
            </Animated.View>
          )
        )}
      </View>
    </View>
  );
};

// Basic styles with improvements
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#03ff5b',
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  home: {
    padding: 5,
  },
  image: {
    width: 300,
    height: 150,
    marginBottom: 10,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20,
  },
  buttonWrapper: {
    width: '48%', // 50% minus some spacing for a grid
    marginBottom: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1f02fa',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonPressed: {
    opacity: 0.8,
  },
});

export default AdminPage;
