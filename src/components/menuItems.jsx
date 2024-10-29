import React from 'react';
import { FlatList, View, Text, Image, StyleSheet } from 'react-native';

const PancakePage = () => {
  return (
    <FlatList
      data={PancakePage}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>Rs{item.price}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    flex: 1,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PancakePage;
