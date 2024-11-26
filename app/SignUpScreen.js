import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function SignUpScreen() {
  const router = useRouter(); // Navigation을 위한 Router 객체

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>SookLog</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>나의 데일리 감정 일기</Text>

      {/* Kakao Login Button */}
      <TouchableOpacity
        style={styles.kakaoButton}
        onPress={() => router.push('/HomeScreen')} // 경로 수정
      >
        <Image
          source={{ uri: 'https://developers.kakao.com/assets/img/about/logos/kakaotalk-sharing-btn-512x512.png' }}
          style={styles.kakaoIcon}
        />
        <Text style={styles.kakaoText}>카카오 로그인</Text>
      </TouchableOpacity>
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#398664',
    marginBottom: 40,
  },
  kakaoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE500',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  kakaoIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  kakaoText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
});

