import { View, Text, Image, StatusBar, Animated } from "react-native";
import React, { useEffect, useRef } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  // Animated values
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoRotate = useRef(new Animated.Value(0)).current; // Rotation for logo
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(20)).current;
  const titleColor = useRef(new Animated.Value(0)).current; // Color animation for text

  useEffect(() => {
    // Animate logo (fade-in with scaling and rotation)
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 5,
        tension: 100,
        useNativeDriver: true,
      }),
      Animated.timing(logoRotate, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Animate text (fade-in, slide-up, and color change)
    Animated.sequence([
      Animated.delay(500),
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
        Animated.timing(titleColor, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
    ]).start();

    // Navigate to 'Home' after 2.5 seconds
    const timer = setTimeout(() => navigation.navigate('Home'), 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  const interpolateColor = titleColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E4003A', '#ffffff'], // Change from red to white
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E4003A' }}>
      <StatusBar barStyle="light-content" />
      
      <Animated.View
        style={{
          transform: [
            { scale: logoScale },
            { rotate: logoRotate.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) },
          ],
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
        <Animated.Text
          style={{
            fontSize: hp(7),
            fontWeight: 'bold',
            color: interpolateColor, // Animated color change
            letterSpacing: 2,
            textAlign: 'center',
            fontFamily:"cursive"
          }}
        >
          American Pancake
        </Animated.Text>

        <Animated.Text
          style={{
            fontSize: hp(2.5),
            fontWeight: '500',
            color: 'white',
            marginTop: 10,
            textAlign: 'center',
            fontFamily:"san-serif",
            transform: [
              {
                translateX: textTranslateY.interpolate({
                  inputRange: [-10, 0, 10],
                  outputRange: [-5, 0, 5],
                  extrapolate: 'clamp',
                }),
              },
            ], // Adds a slight wiggle effect
          }}
        >
          Snack is always right
        </Animated.Text>
      </Animated.View>
    </View>
  );
}
