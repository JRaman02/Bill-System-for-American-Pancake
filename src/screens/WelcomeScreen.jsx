import { View, Text, Image, StatusBar } from "react-native";
import React, { useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => navigation.navigate('Home'), 2500); // Navigate to 'Home' after 3 seconds
    return () => clearTimeout(timer); // Clean up the timer
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#03fff2' }}>
      <StatusBar barStyle="light-content" />
      <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 999, padding: hp(5.5) }}>
        <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 999, padding: hp(5) }}>
          <Image
            source={require('../assets/images/logo.png')}
            style={{ width: hp(20), height: hp(20) }}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <Text style={{ fontSize: hp(7), fontWeight: 'bold', color: 'blue', letterSpacing: 2, alignItems: 'center', fontSize: 30, }}>
          American Pancake
        </Text>
        <Text style={{ fontSize: hp(2.5), fontWeight: '500', color: 'white', letterSpacing: 2, marginTop: 10, alignItems: 'center' }}>
          Snack is always right
        </Text>
      </View>
    </View>
    
  );
}
