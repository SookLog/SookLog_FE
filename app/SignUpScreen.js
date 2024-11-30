import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as Linking from "expo-linking"; // 딥링크 처리 라이브러리
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function SignUpScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 딥링크 리스너
    const handleDeepLink = async (event) => {
      const { path, queryParams } = Linking.parse(event.url || "");
      console.log("Deep link triggered:", path, queryParams);

      if (path === "home") {
        const accessToken = queryParams.accessToken; // 딥링크에서 accessToken 추출
        if (accessToken) {
          try {
            // Access Token 저장
            await AsyncStorage.setItem("accessToken", accessToken);
            console.log("Access Token saved:", accessToken);

            // 홈 화면으로 이동
            router.push("/HomeScreen");
          } catch (error) {
            console.error("Error saving accessToken:", error);
            Alert.alert("Error", "로그인 정보를 저장하는 중 문제가 발생했습니다.");
          }
        } else {
          Alert.alert("Error", "Access Token이 누락되었습니다. 다시 로그인 해주세요.");
        }
      }
    };

    // 이벤트 리스너 추가
    const subscription = Linking.addEventListener("url", handleDeepLink);

    // 초기 URL 확인
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      subscription.remove();
    };
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      // 카카오 로그인 페이지 열기
      const kakaoLoginUrl =
        "http://43.203.46.58:8080/oauth2/authorization/kakao";
      Linking.openURL(kakaoLoginUrl);
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert("Error", "로그인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const checkStoredData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const memberId = await AsyncStorage.getItem("memberId");
      console.log("Stored Access Token:", accessToken);
      console.log("Stored Member ID:", memberId);
    } catch (error) {
      console.error("Error fetching stored data:", error);
    }
  };

  // AsyncStorage 확인
  useEffect(() => {
    checkStoredData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SookLog</Text>
      <Text style={styles.subtitle}>나의 데일리 감정 일기</Text>

      <TouchableOpacity
        style={styles.kakaoButton}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <Text style={styles.kakaoText}>카카오 로그인</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#398664",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#398664",
    marginBottom: 40,
  },
  kakaoButton: {
    backgroundColor: "#FEE500",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  kakaoText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
});
