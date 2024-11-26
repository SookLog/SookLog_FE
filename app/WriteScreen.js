import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';

export default function WriteScreen() {
  const [title, setTitle] = useState('');
  const [diaryText, setDiaryText] = useState('');

  // 현재 날짜 가져오기
  const today = new Date();
  const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

  // 작성 완료 버튼 동작
  const handleComplete = () => {
    if (!title || !diaryText) {
      Alert.alert('Incomplete', 'Please fill in all fields before submitting.');
      return;
    }

    // 날짜, 제목, 일기 내용을 로그로 출력
    console.log('Diary Submitted:', { date: formattedDate, title, diaryText });
    setTitle('');
    setDiaryText('');
    Alert.alert('Success', 'Diary saved successfully!');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.title}>SookLog</Text>

        {/* Date Section */}
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>DATE: {formattedDate}</Text>
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
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Editable Diary Section */}
        <View style={styles.diaryContainer}>
          <TextInput
            style={styles.diaryInput}
            placeholder="Write your diary..."
            placeholderTextColor="#888"
            multiline={true}
            value={diaryText}
            onChangeText={setDiaryText}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!title || !diaryText) && styles.submitButtonDisabled,
          ]}
          onPress={handleComplete}
          disabled={!title || !diaryText}
        >
          <Text style={styles.submitButtonText}>Complete</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
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
    padding: 8,
  },
  diaryInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#398664',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonDisabled: {
    backgroundColor: '#bbb',
  },
  submitButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
