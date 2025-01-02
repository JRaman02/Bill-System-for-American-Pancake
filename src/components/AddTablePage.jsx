import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid'; // Assuming you're using `react-native-heroicons`

const AddTablePage = ({ navigation }) => {
  const [tableData, setTableData] = useState([]);
  const [tableNumber, setTableNumber] = useState('');
  const [tableType, setTableType] = useState('');

  const addEntry = () => {
    if (tableNumber.trim()) {
      const newTable = {
        number: tableNumber,
        type: tableType,
      };

      // Send data to the API
      fetch('http://192.168.29.148:8000/pancake_api/table/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTable),
      })
        .then((response) => response.json())
        .then((data) => {
          // Add the new table data to the state with the returned ID from the API
          setTableData([
            ...tableData,
            { id: data.id, number: data.number, type: data.type },
          ]);
          setTableNumber('');
          setTableType('');
        })
        .catch((error) => {
          console.error('Error adding table:', error);
        });
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{`Table Number: ${item.number}, Type: ${item.type}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable
          onPress={() => navigation.navigate('AdminPage')}
          style={styles.homeButton}
        >
          <ArrowLeftIcon size={28} color="#fff" />
        </Pressable>
        <Text style={styles.header}>Add Table Entry</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter table number"
        placeholderTextColor="#7f8c8d"
        value={tableNumber}
        onChangeText={setTableNumber}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter table type (e.g., Friend, couples)"
        placeholderTextColor="#7f8c8d"
        value={tableType}
        onChangeText={setTableType}
      />
      <Pressable style={styles.addButton} onPress={addEntry}>
        <Text style={styles.addButtonText}>Add Entry</Text>
      </Pressable>
      <FlatList
        data={tableData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginLeft: 25,
    color: '#2c3e50',
   
  },
  input: {
    height: 50,
    borderColor: '#bdc3c7',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#34495e',
  },
  addButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  list: {
    marginTop: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  homeButton: {
    padding: 10,
    marginLeft: 1,
    borderRadius: 50,
    backgroundColor: '#77e6f7',
  },
});

export default AddTablePage;
