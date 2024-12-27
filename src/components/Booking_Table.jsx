import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Animated,
  Pressable,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ArrowLeftIcon } from "react-native-heroicons/solid";

const BookingTable = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: "",
    mobile_no: "",
    table_no: "",
    date: new Date(),
    time: new Date(),
  });
  const [tableOptions, setTableOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const fadeAnim = useState(new Animated.Value(0))[0];
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [apiUrl, setApiUrl] = useState("http://192.168.29.148:8000/pancake_api/table/");

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Fetch table data when API URL changes
    const fetchTableData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setTableOptions(data);
      } catch (error) {
        console.error("Error fetching table data:", error);
        Alert.alert("Error", "Failed to load table options. Please try again later.");
      }
    };

    fetchTableData();
  }, [apiUrl]);

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
    const newErrors = {};

    if (!formData.name) {
      valid = false;
      newErrors.name = "Name is required.";
    }

    if (!formData.mobile_no || !/^[0-9]{10}$/.test(formData.mobile_no)) {
      valid = false;
      newErrors.mobile_no = "Enter a valid mobile number (10 digits only).";
    }

    if (!formData.table_no) {
      valid = false;
      newErrors.table_no = "Table number is required.";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await fetch("http://192.168.29.148:8000/pancake_api/tablebooking/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            mobile_no: formData.mobile_no,
            table_no: formData.table_no,
            date: formData.date.toISOString().split("T")[0],
            time: formData.time.toTimeString().split(" ")[0],
          }),
        });

        if (response.ok) {
          Alert.alert("Success", "Table booked successfully!");
          navigation.navigate("TPPage", { bookingDetails: formData });
        } else {
          Alert.alert("Error", "Failed to book the table. Please try again.");
        }
      } catch (error) {
        Alert.alert("Error", "Something went wrong. Please check your internet connection.");
        console.error(error);
      }
    } else {
      Alert.alert("Error", "Please correct the highlighted fields.");
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate("UserPage")}
        style={styles.homeButton}
      >
        <ArrowLeftIcon size={28} color="#fff" />
      </Pressable>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
          Booking Table
        </Animated.Text>

        <View style={styles.form}>
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={[styles.input, errors.name && styles.errorInput]}
              value={formData.name}
              onChangeText={(value) => handleChange("name", value)}
              placeholder="Enter your name"
              placeholderTextColor="#888"
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <Text style={styles.label}>Mobile No:</Text>
            <TextInput
              style={[styles.input, errors.mobile_no && styles.errorInput]}
              value={formData.mobile_no}
              onChangeText={(value) => handleChange("mobile_no", value)}
              placeholder="Enter your mobile number"
              placeholderTextColor="#888"
              keyboardType="phone-pad"
            />
            {errors.mobile_no && <Text style={styles.errorText}>{errors.mobile_no}</Text>}

            <Text style={styles.label}>Table No:</Text>
            <Picker
              selectedValue={formData.table_no}
              onValueChange={(value) => handleChange("table_no", value)}
              style={[styles.picker, errors.table_no && styles.errorInput]}
            >
              <Picker.Item label="Select Table No" value="" />
              {tableOptions.map((table) => (
                <Picker.Item key={table.id} label={`Table ${table.number} (${table.type})`} value={table.id} />
              ))}
            </Picker>
            {errors.table_no && <Text style={styles.errorText}>{errors.table_no}</Text>}

            <Text style={styles.label}>Date:</Text>
            <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
            {showDatePicker && (
              <DateTimePicker
                value={formData.date}
                mode="date"
                display="default"
                onChange={(event, date) => {
                  setShowDatePicker(false);
                  if (date) handleChange("date", date);
                }}
              />
            )}
            {formData.date && (
              <Text style={styles.selectedDateTime}>
                Selected Date: {formData.date.toLocaleDateString()}
              </Text>
            )}

            <Text style={styles.label}>Time:</Text>
            <Button title="Select Time" onPress={() => setShowTimePicker(true)} />
            {showTimePicker && (
              <DateTimePicker
                value={formData.time}
                mode="time"
                display="default"
                onChange={(event, time) => {
                  setShowTimePicker(false);
                  if (time) handleChange("time", time);
                }}
              />
            )}
            {formData.time && (
              <Text style={styles.selectedDateTime}>
                Selected Time:{" "}
                {formData.time.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            )}

            <Pressable style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitText}>Book Table</Text>
            </Pressable>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5", justifyContent: "flex-end" },
  scrollView: { paddingBottom: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 30, color: "#333", textAlign: "center" },
  label: { fontSize: 16, marginBottom: 5, color: "#333" },
  input: { height: 40, borderColor: "#ccc", borderWidth: 1, marginBottom: 15, paddingHorizontal: 10 },
  errorInput: { borderColor: "red" },
  errorText: { color: "red", marginBottom: 10 },
  picker: { height: 50, width: "100%", marginBottom: 15 },
  selectedDateTime: { fontSize: 16, color: "#555", marginBottom: 15 },
  submitButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  submitText: { color: "#fff", fontSize: 18 },
  homeButton: {
    position: "absolute",
    top: 20,
    left: 20,
    padding: 1,
    backgroundColor: "#4CAF50",
    borderRadius: 30,
    zIndex: 999,
  },
});

export default BookingTable;
