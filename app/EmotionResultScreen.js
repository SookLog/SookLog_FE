import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function EmotionResultScreen({ route }) {
  const { date, title, diaryText, emotion } = route.params; // 전달받은 데이터

  return (
    <View style={styles.container}>
      <Text style={styles.title}>감정 분석 결과</Text>
      <View style={styles.resultContainer}>
        <Text style={styles.dateText}>DATE: {date}</Text>
        <Text style={styles.emoji}>😊</Text>
        <Text style={styles.resultText}>오늘은 "{emotion}" 입니다</Text>
        <Text style={styles.subtitle}>Title: {title}</Text>
        <Text style={styles.diaryText}>Diary: {diaryText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#398664',
  },
  resultContainer: {
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    marginBottom: 16,
    color: '#398664',
  },
  emoji: {
    fontSize: 80,
    marginBottom: 16,
    color: '#398664',
  },
  resultText: {
    fontSize: 20,
    color: '#398664',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 8,
    color: '#555',
  },
  diaryText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});
