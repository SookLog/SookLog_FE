import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession(); // AuthSession 처리를 마무리

export default function SignUpScreen() {
  const [accessToken, setAccessToken] = useState(null);

  const handleKakaoLogin = async () => {
    const kakaoLoginUrl = 'http://43.203.46.58:8080/oauth2/authorization/kakao';
    
    try {
      // 브라우저를 열어 로그인 시도
      const result = await WebBrowser.openAuthSessionAsync(kakaoLoginUrl, Linking.createURL('/redirect'));
      
      // 로그인 결과 확인
      if (result.type === 'success' && result.url) {
        const token = result.url.split('accessToken=')[1];
        if (token) {
          setAccessToken(token);
          Alert.alert('Login Successful', `AccessToken: ${token}`);
        }
      } else {
        Alert.alert('Login Failed', 'Could not retrieve access token.');
      }
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Error', 'Failed to open login URL.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>SookLog</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>나의 데일리 감정 일기</Text>

      {/* Kakao Login Button */}
      <TouchableOpacity style={styles.kakaoButton} onPress={handleKakaoLogin}>
        <Image
          source={{
            uri: 'https://developers.kakao.com/assets/img/about/logos/kakaotalk-sharing-btn-512x512.png',
          }}
          style={styles.kakaoIcon}
        />
        <Text style={styles.kakaoText}>카카오 로그인</Text>
      </TouchableOpacity>

      {/* Display AccessToken */}
      {accessToken && <Text style={styles.tokenText}>AccessToken: {accessToken}</Text>}
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
  tokenText: {
    marginTop: 20,
    fontSize: 14,
    color: '#000',
  },
});
