import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CachedImage } from '../helpers/image';  // Ensure the CachedImage helper is correctly implemented

export default function Categories({ categories, activeCategory, setActiveCategory }) {
    return (
        <View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="space-x-4"
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {categories.map((cat, index) => {
                    let isActive = cat.strCategory === activeCategory;
                    let activeButtonClass = isActive ? ' bg-amber-400' : 'bg-black/10';
                    return (
                        <TouchableOpacity
                            key={index}  // Corrected to lowercase "key"
                            onPress={() => setActiveCategory(cat.strCategory)}  // Ensure setActiveCategory is passed properly
                            className="flex items-center space-y-1"
                        >
                            <View className={"rounded-full p-[6px]" + activeButtonClass}>
                                <CachedImage
                                    uri={cat.strCategoryThumb}
                                    style={{ width: hp(6), height: hp(6) }}
                                    className="rounded-full"
                                />
                            </View>
                            <Text className="text-neutral-600" style={{ fontSize: hp(1.6) }}>
                                {cat.strCategory}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}
