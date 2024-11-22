import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

export default function WriteScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>SookLog</Text>

      {/* Date Section */}
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>DATE: 2024.09.09</Text>
        <View style={styles.icons}>
          <Text style={styles.icon}>😊</Text>
          <Text style={styles.icon}>🌞</Text>
        </View>
      </View>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          placeholder="Write your title here..."
          placeholderTextColor="#888"
        />
      </View>

      {/* Placeholder for Diary */}
      <View style={styles.diaryContainer}>
        <Text style={styles.placeholderText}>Write your diary...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#398664',
    textAlign: 'center',
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#398664',
    borderRadius: 8,
    padding: 8,
  },
  dateText: {
    fontSize: 16,
    color: '#398664',
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    fontSize: 20,
    marginLeft: 8,
    color: '#FF6347',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#398664',
    paddingBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#398664',
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  diaryContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#398664',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#888',
  },
});
