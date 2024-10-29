import { View, Text, ScrollView, TouchableOpacity, StatusBar, ImageBackground } from "react-native";
import React, { useState, useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CachedImage } from "../helpers/image"; // Assuming you use cached images
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import YoutubeIframe from 'react-native-youtube-iframe';

export default function RecipeDetailScreen(props) {
    let item = props.route.params;
    const [isFavourite, setIsFavourite] = useState(false);
    const navigation = useNavigation();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMealData(item.idMeal);
    }, []);

    const getMealData = async (id) => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            if (response && response.data) {
                setMeal(response.data.meals[0]);
                setLoading(false);
            }
        } catch (err) {
            console.log('Error:', err.message);
        }
    };

    const ingredientsIndexes = (meal) => {
        if (!meal) return [];
        let indexes = [];
        for (let i = 1; i <= 20; i++) {
            if (meal['strIngredient' + i]) {
                indexes.push(i);
            }
        }
        return indexes;
    };

    const getYoutubeVideoId = (url) => {
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if (match && match[1]) {
            return match[1];
        }
        return null;
    };

    return (
        <ScrollView
            className="bg-white flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
        >
            <StatusBar barStyle='dark-content' />

            {/* Recipe image with rounded top and flat bottom */}
            <ImageBackground
                source={{ uri: item.strMealThumb }}
                style={{ width: wp(100), height: hp(40), borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
                resizeMode="cover"
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                    {/* Back button */}
                    <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-full bg-white">
                        <ChevronLeftIcon size={hp(3.9)} strokeWidth={4.5} color="#fbbf24" />
                    </TouchableOpacity>

                    {/* Heart icon for favorite */}
                    <TouchableOpacity 
                        onPressIn={() => setIsFavourite(!isFavourite)} 
                        className="p-2 rounded-full bg-white"
                        style={{ alignItems: 'flex-end' }} 
                    >
                        <HeartIcon size={hp(3.9)} strokeWidth={4.5} color={isFavourite ? "red" : "white"} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            {/* Meal description */}
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <View className="px-4 space-y-4 pt-4">
                    {/* Name and Area */}
                    <View className="space-y-2">
                        <Text style={{ fontSize: hp(4), textAlign: "center" }} className="font-bold text-neutral-700">
                            {meal?.strMeal}
                        </Text>
                        <Text style={{ fontSize: hp(2), textAlign: "center" }} className="font-medium text-neutral-500">
                            {meal?.strArea}
                        </Text>
                    </View>

                    {/* Detail section */}
                    <View
                        style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderColor: 'black',
                        borderWidth: 0,
                        borderRadius: 10,
                        backgroundColor: '#fbbf24',
                        padding:10,
                        }}
                        className="flex-row justify-around py-4"
                    >
                        {[
                            { icon: "🕒", value: "35", label: "Mins" },
                            { icon: "👥", value: "03", label: "Servings" },
                            { icon: "🔥", value: "103", label: "Cal" },
                            { icon: "📦", value: "Easy", label: "" }
                        ].map((detail, index) => (
                            <View key={index} className="flex items-center">
                                <View
                                    style={{
                                        height: hp(6),
                                        width: hp(6),
                                        borderColor: 'black',
                                        borderWidth: 1,
                                        borderRadius: 50,
                                        backgroundColor: 'white',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    className="flex items-center justify-center"
                                >
                                    <Text>{detail.icon}</Text>
                                </View>
                                <Text style={{ fontSize: hp(2), marginTop: 5 }} className="font-bold text-neutral-700">
                                    {detail.value}
                                </Text>
                                <Text style={{ fontSize: hp(1.5), textAlign: 'center' }} className="font-bold text-neutral-700">
                                    {detail.label}
                                </Text>
                            </View>
                        ))}
                    </View>
                    
                    {/* Ingredients */}
                    <View 
                        style={{ paddingVertical: 10, paddingHorizontal: 25, backgroundColor: 'white', borderRadius: 10, elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8 }} 
                        className="space-y-6"
                    >
                        {/* Title */}
                        <Text style={{ fontSize: hp(2.5), letterSpacing: 0.5 }} className="font-bold text-neutral-700">
                            Ingredients
                        </Text>
                        
                        {/* Ingredient List */}
                        <View className="space-y-3 ml-3">
                            {ingredientsIndexes(meal).map(i => (
                                <View style={{flexDirection:'row'}} key={i} className="flex-row space-x-4 items-center">
                                    
                                    {/* Bullet Character */}
                                    <Text 
                                        style={{ 
                                            fontSize: hp(3.5), 
                                            color: 'orange', 
                                            marginRight: 20, 
                                            alignSelf: 'flex-start', 
                                        }}
                                    >•</Text>

                                    {/* Ingredient and Measure */}
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }} className="flex-1 space-x-4">
                                        <Text className="font-extrabold text-neutral-700">
                                            {meal['strMeasure' + i]}
                                        </Text>
                                        <Text className="font-medium text-neutral-600">
                                            {meal['strIngredient' + i]}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Instructions */}
                    <View className="space-y-4">
                        <Text style={{ fontSize: hp(2.5) }} className="font-bold text-neutral-700">
                            Instructions
                        </Text>
                        <Text style={{ fontSize: hp(1.6) }} className="font-medium text-neutral-600">
                            {meal.strInstructions}
                        </Text>
                    </View>

                    {/* YouTube video */}
                    {meal.strYoutube && (
                        <View className="space-y-4">
                            <Text style={{ fontSize: hp(2.5) }} className="font-bold text-neutral-700">
                                Video Tutorial
                            </Text>
                            <YoutubeIframe
                                height={200}
                                width={wp(100)}
                                videoId={getYoutubeVideoId(meal.strYoutube)}
                                onChangeState={console.log}
                            />
                        </View>
                    )}
                </View>
            )}
        </ScrollView>
    );
}
