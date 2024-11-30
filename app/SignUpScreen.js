import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router"; // expo-router 사용

export default function SignUpScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // Router 객체 사용

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      // /HomeScreen으로 이동
      router.push("/HomeScreen");
    } catch (error) {
      console.error("화면 전환 중 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
