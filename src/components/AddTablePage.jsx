import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const AddTablePage = () => {
  const [tableData, setTableData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [tableType, setTableType] = useState('single'); // You can change this as needed

  const addEntry = () => {
    if (inputValue.trim()) {
      const newTable = {
        number: inputValue,
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
          setTableData([...tableData, { id: data.id, value: data.number }]);
          setInputValue('');
        })
        .catch((error) => {
          console.error('Error adding table:', error);
        });
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{`Table Number: ${item.value}, Type: ${item.type || 'N/A'}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Table Entry</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter table number"
        value={inputValue}
        onChangeText={setInputValue}
      />
      <TextInput
        style={styles.input}
        placeholder="type"
        value={inputValue}
        onChangeText={setInputValue}
      />
      <Button title="Add Entry" onPress={addEntry} />
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
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  list: {
    marginTop: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default AddTablePage;
