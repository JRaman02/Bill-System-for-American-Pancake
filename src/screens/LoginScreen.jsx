import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  Pressable,
  Animated,
} from 'react-native';
import {
  ArrowLeftIcon,
  EyeIcon,
  EyeSlashIcon,
} from 'react-native-heroicons/outline';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Animation references
  const usernameSlide = useRef(new Animated.Value(900)).current;
  const passwordSlide = useRef(new Animated.Value(900)).current; 
  const buttonSlide = useRef(new Animated.Value(900)).current; 

  // Run animations on mount
  useEffect(() => {
    Animated.sequence([
      Animated.timing(usernameSlide, {
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
  }, [usernameSlide, passwordSlide, buttonSlide]);

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Login failed', 'Please enter both username and password');
      return;
    }

    console.log('Login attempted:', username, password);
    if (username === 'admin' && password === 'adminpass') {
      navigation.navigate('AdminPage');
    } else if (username === 'User' && password === 'Userpass') {
      navigation.navigate('UserPage');
    } else {
      Alert.alert('Login failed', 'Invalid username or password');
    }
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

      {/* Username input */}
      <Animated.View style={{ transform: [{ translateY: usernameSlide }], width: '100%' }}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
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
  img: {
    width: 250,
    height: 150,
    marginBottom: 30,
    resizeMode: 'contain',
  },
});

export default LoginScreen;
