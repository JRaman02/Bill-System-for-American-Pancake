import { View, Text, Image, StatusBar, Animated } from "react-native";
import React, { useEffect, useRef } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  // Animated values
  const logoScale = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(20)).current; // Start slightly below

  useEffect(() => {
    // Animate logo (fade-in with scaling)
    Animated.spring(logoScale, {
      toValue: 1,
      friction: 5,
      tension: 100,
      useNativeDriver: true,
    }).start();

    // Animate text (fade-in and slide-up)
    Animated.sequence([
      Animated.delay(500), // Wait for logo animation to start
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslateY, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Navigate to 'Home' after 2.5 seconds
    const timer = setTimeout(() => navigation.navigate('Home'), 2500);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#03fff2' }}>
      <StatusBar barStyle="light-content" />
      <Animated.View
        style={{
          transform: [{ scale: logoScale }],
          backgroundColor: 'rgba(255,255,255,0.2)',
          borderRadius: 999,
          padding: hp(5.5),
          opacity: logoScale, // Fade in as it scales
        }}
      >
        <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 999, padding: hp(5) }}>
          <Image
            source={require('../assets/images/logo.png')}
            style={{ width: hp(20), height: hp(20) }}
            resizeMode="contain"
          />
        </View>
      </Animated.View>
      <Animated.View
        style={{
          alignItems: 'center',
          marginTop: 10,
          opacity: textOpacity,
          transform: [{ translateY: textTranslateY }],
        }}
      >
        <Text
          style={{
            fontSize: hp(7),
            fontWeight: 'bold',
            color: 'blue',
            letterSpacing: 2,
            textAlign: 'center',
            fontSize: 30,
          }}
        >
          American Pancake
        </Text>
        <Text
          style={{
            fontSize: hp(2.5),
            fontWeight: '500',
            color: 'white',
            letterSpacing: 2,
            marginTop: 10,
            textAlign: 'center',
          }}
        >
          Snack is always right
        </Text>
      </Animated.View>
    </View>
  );
}
