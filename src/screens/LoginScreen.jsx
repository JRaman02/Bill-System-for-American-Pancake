import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image, Pressable, Animated } from 'react-native';
import { ArrowLeftIcon, EyeIcon, EyeSlashIcon } from 'react-native-heroicons/outline';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Animation references
  const emailSlide = useRef(new Animated.Value(900)).current;
  const passwordSlide = useRef(new Animated.Value(900)).current;
  const buttonSlide = useRef(new Animated.Value(900)).current;

  // Run animations on mount
  useEffect(() => {
    Animated.sequence([
      Animated.timing(emailSlide, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(passwordSlide, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(buttonSlide, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [emailSlide, passwordSlide, buttonSlide]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Login Failed', 'Please enter both email and password.');
      return;
    }

    try {
      const response = await fetch('http://192.168.29.148:8000/account_api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        Alert.alert('Success', data.message);

        // Navigate based on role
        if (data.role === 'admin') {
          navigation.navigate('AdminPage'); // Replace with your actual Admin screen
        } else if (data.role === 'user') {
          navigation.navigate('UserPage'); // Replace with your actual User screen
        } else {
          Alert.alert('Login Failed', 'Invalid role.');
        }
      } else {
        throw new Error(data.message || 'Login failed.');
      }
    } catch (error) {
      Alert.alert('Login Failed', error.message || 'An error occurred.');
    }
  };

  const handleRegister = () => {
    navigation.navigate('RegisterScreen'); // Replace with your actual registration screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('Home')} style={styles.home}>
          <ArrowLeftIcon size={28} color="#fff" />
        </Pressable>
      </View>

      <Image
        source={require('../assets/images/logo.png')} // Adjust the path as necessary
        style={styles.img}
      />
      <Text style={styles.title}>Login</Text>

      {/* Email input */}
      <Animated.View style={{ transform: [{ translateY: emailSlide }], width: '100%' }}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholderTextColor="#aaa"
        />
      </Animated.View>

      {/* Password input */}
      <Animated.View style={{ transform: [{ translateY: passwordSlide }], width: '100%' }}>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            {showPassword ? (
              <EyeSlashIcon size={24} color="#333" />
            ) : (
              <EyeIcon size={24} color="#333" />
            )}
          </Pressable>
        </View>
      </Animated.View>

      {/* Login button */}
      <Animated.View style={{ transform: [{ translateY: buttonSlide }], width: '100%' }}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Register button */}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F95454',
    padding: 20,
    position: 'relative',
  },
  header: {
    position: 'absolute',
    top: 15,
    left: 14,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  home: {
    padding: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    fontFamily: 'cursive',
  },
  input: {
    width: '100%',
    padding: 9,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
    paddingLeft: 20,
    fontSize: 13,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  passwordContainer: {
    width: '100%',
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
  loginButton: {
    backgroundColor: '#FFAD60',
    paddingVertical: 10,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    fontFamily: 'sans-serif',
  },
  registerButton: {
    marginTop: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  img: {
    width: 250,
    height: 150,
    marginBottom: 30,
    resizeMode: 'contain',
  },
});

export default LoginScreen;
