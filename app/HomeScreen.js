import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>SookLog</Text>

      {/* Tree Image */}
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/620/620685.png' }} // 트리 이미지 URL
        style={styles.treeImage}
      />

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        오늘의 일기가 ‘긍정’일 때 변화되는 모습을 볼 수 있어요!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#398664',
    marginBottom: 20,
  },
  treeImage: {
    width: 120,
    height: 180,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#398664',
    textAlign: 'center',
  },
});
