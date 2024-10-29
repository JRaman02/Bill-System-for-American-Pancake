import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const AddTablePage = () => {
  const [tableData, setTableData] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addEntry = () => {
    if (inputValue.trim()) {
      setTableData([...tableData, { id: Date.now().toString(), value: inputValue }]);
      setInputValue('');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Table Entry</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter value"
        value={inputValue}
        onChangeText={setInputValue}
      />
      <Button title="Add Entry" onPress={addEntry} />
      <FlatList
        data={tableData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
