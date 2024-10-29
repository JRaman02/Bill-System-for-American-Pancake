import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const BookingTable = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    tableNo: "",
    date: "",
    time: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (!formData.name) {
      valid = false;
      newErrors.name = "Name is required.";
    }

    if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) {
      valid = false;
      newErrors.mobile = "Valid mobile number is required.";
    }

    if (!formData.tableNo) {
      valid = false;
      newErrors.tableNo = "Table number is required.";
    }

    // Modified date validation to accept both formats
    if (!formData.date || !/^(0[1-9]|[12][0-9]|3[01])[/-](0[1-9]|1[0-2])[/-](\d{2})$/.test(formData.date)) {
      valid = false;
      newErrors.date = "Valid date (DD/MM/YY or DD-MM-YY) is required.";
    }

    if (!formData.time || !/^\d{2}:\d{2}$/.test(formData.time)) {
      valid = false;
      newErrors.time = "Valid time (HH:MM) is required.";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const formattedDate = formatDate(formData.date);
      
      if (formattedDate) {
        console.log("Booking Data:", { ...formData, date: formattedDate });
        navigation.navigate('ConfirmationMessage', { bookingData: { ...formData, date: formattedDate } });
      }
    } else {
      Alert.alert("Error", "Please correct the highlighted fields.");
    }
  };

  const formatDate = (dateString) => {
    const regex = /^(0[1-9]|[12][0-9]|3[01])[/-](0[1-9]|1[0-2])[/-](\d{2})$/;
    
    if (regex.test(dateString)) {
      const separator = dateString.includes('/') ? '/' : '-';
      const [day, month, year] = dateString.split(separator);
      
      // Convert to YYYY-MM-DD format
      return `20${year}-${month}-${day}`; // Assuming the year is in 20xx format
    } else {
      Alert.alert("Error", "Invalid date format. Please use DD/MM/YY or DD-MM-YY.");
      return null; 
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image 
          source={require('../assets/images/logo.png')} // Adjust the path as necessary
          style={styles.image} 
        />
        <Text style={styles.title}>Booking Table</Text>

        {/* Name Input */}
        <Text>Name:</Text>
        <TextInput
          style={[styles.input, errors.name && styles.errorInput]}
          value={formData.name}
          onChangeText={(value) => handleChange("name", value)}
          placeholder="Enter your name"
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        {/* Mobile Number Input */}
        <Text>Mobile No:</Text>
        <TextInput
          style={[styles.input, errors.mobile && styles.errorInput]}
          value={formData.mobile}
          onChangeText={(value) => handleChange("mobile", value)}
          placeholder="Enter your mobile number"
          keyboardType="phone-pad"
        />
        {errors.mobile && <Text style={styles.errorText}>{errors.mobile}</Text>}

        {/* Select Table Number */}
        <Text>Table No:</Text>
        <Picker
          selectedValue={formData.tableNo}
          onValueChange={(value) => handleChange("tableNo", value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Table No" value="" />
          <Picker.Item label="Table 1" value="1" />
          <Picker.Item label="Table 2" value="2" />
          <Picker.Item label="Table 3" value="3" />
          <Picker.Item label="Table 4" value="4" />
        </Picker>
        {errors.tableNo && <Text style={styles.errorText}>{errors.tableNo}</Text>}

        {/* Date Input */}
        <Text>Date:</Text>
        <TextInput
          style={[styles.input, errors.date && styles.errorInput]}
          value={formData.date}
          onChangeText={(value) => handleChange("date", value)}
          placeholder="DD/MM/YY"
        />
        {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}

        {/* Time Input */}
        <Text>Time:</Text>
        <TextInput
          style={[styles.input, errors.time && styles.errorInput]}
          value={formData.time}
          onChangeText={(value) => handleChange("time", value)}
          placeholder="HH:MM"
        />
        {errors.time && <Text style={styles.errorText}>{errors.time}</Text>}

        {/* Submit Button */}
        <Button title="Booking Table" onPress={handleSubmit} />

        {/* Note about late arrival */}
        <Text style={styles.note}>
          * Note: If you arrive 5 minutes late, your booking table will be given to another person.
        </Text>
      </ScrollView>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  scrollView: {
    paddingBottom: 20, // Ensures there's space at the bottom
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 15,
  },
  note: {
    marginTop: 20,
    color: 'red',
    fontStyle: 'italic',
  },
  image: {
    width: '100%', 
    height: 200,  
    marginBottom: 20, 
  },
});

export default BookingTable;
