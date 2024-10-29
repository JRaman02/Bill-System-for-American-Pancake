import { View, Text, Image, StatusBar, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import Categories from '../components/categories';
import Recipes from '../components/recipes';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null); 

  const navigation = useNavigation(); 

  useEffect(() => {
    getCategories();
    getRecipes(activeCategory);
  }, [activeCategory]); 

  const handleChangeCategory = (category) => {
    setActiveCategory(category); 
    getRecipes(category); 
  };

  const getCategories = async () => {
    try {
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (err) {
      console.log('error: ', err.message);
      setError('Failed to fetch categories.');
    }
  };

  const getRecipes = async (category = 'Beef') => {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (err) {
      console.log('error: ', err.message);
      setError('Failed to fetch recipes.');
    }
  };

  const filteredMeals = meals.filter(meal =>
    meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        <View className="mx-4 space-y-2 mb-2">
          <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">Hello, Noman!</Text>
          <View>
            <Text style={{ fontSize: hp(3.8) }} className="font-semibold text-neutral-600">American Pancake</Text>
          </View>
          <Text style={{ fontSize: hp(3.8) }} className="font-semibold text-neutral-600">
            Snack <Text className="text-amber-400"></Text>
          </Text>
        </View>

        <View style={{ marginHorizontal: 4, flexDirection: 'row', alignItems: 'center', borderRadius: 25, backgroundColor: 'rgba(0,0,0,0.05)', padding: -2 }} className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder='Search any recipe'
            placeholderTextColor='gray'
            style={{ fontSize: 15, flex: 1, paddingLeft: 8, letterSpacing: 0.5 }}
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
          <View style={{ backgroundColor: 'white', borderRadius: 25, padding: 8 }}>
            <MagnifyingGlassIcon size={17} strokeWidth={2} color="gray" />
          </View>
        </View>

        {error && (
          <View className="mx-4">
            <Text className="text-red-500">{error}</Text>
          </View>
        )}

        <View>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>

        <View>
          <Recipes meals={filteredMeals} categories={categories} />
        </View>
      </ScrollView>

      <TouchableOpacity
        style={{
          position: 'absolute',
          top: '2%', 
          right: '4%', 
          padding: 10,
          borderRadius: 10,
          backgroundColor: '#3498db',
        }}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
