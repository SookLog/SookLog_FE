import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker"; // 날짜 선택용 패키지

export default function MemeScreen() {
  const router = useRouter();
  const { date: initialDate } = useLocalSearchParams(); // 초기 날짜만 받음

  // 상태 관리
  const [selectedDate, setSelectedDate] = useState(new Date(initialDate || Date.now())); // 초기 날짜 설정
  const [memeUrl, setMemeUrl] = useState(""); // 짤 URL
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [showDatePicker, setShowDatePicker] = useState(false); // 날짜 선택기 표시 여부

  // 날짜 포맷팅 함수
  const formatDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  // API 호출 함수
  const fetchMeme = async (date) => {
    setIsLoading(true);
    try {
      const formattedDate = formatDate(date);
      const response = await fetch(`http://43.203.46.58:8080/api/diaries/image?date=${formattedDate}`);
      if (!response.ok) {
        throw new Error("Failed to fetch meme");
      }

      const result = await response.json();
      console.log("API response:", result);

      setMemeUrl(result.result); // 짤 URL 업데이트
    } catch (error) {
      console.error("Error fetching meme:", error);
      setMemeUrl(""); // 에러 시 기본값 설정
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트가 처음 렌더링될 때와 날짜가 변경될 때 API 호출
  useEffect(() => {
    fetchMeme(selectedDate);
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>짤 생성 결과</Text>

      <View style={styles.contentContainer}>
        <Text style={styles.text}>작성 날짜: {formatDate(selectedDate)}</Text>

        {/* 로딩 상태 또는 이미지 */}
        {isLoading ? (
          <ActivityIndicator size="large" color="#398664" />
        ) : memeUrl ? (
          <Image source={{ uri: memeUrl }} style={styles.memeImage} />
        ) : (
          <Text style={styles.text}>짤을 불러오는 데 실패했습니다.</Text>
        )}

        {/* 날짜 선택 버튼 */}
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateButtonText}>날짜 선택</Text>
        </TouchableOpacity>
      </View>

      {/* 날짜 선택기 */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) {
              setSelectedDate(date); // 날짜 변경 시 상태 업데이트
            }
          }}
        />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/WriteScreen")} // 다시 일기 쓰기 화면으로 이동
      >
        <Text style={styles.buttonText}>다시 작성하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#398664",
    marginBottom: 24,
  },
  contentContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  text: {
    fontSize: 18,
    color: "#333",
    marginBottom: 8,
  },
  memeImage: {
    width: 300,
    height: 300,
    borderRadius: 8,
    marginVertical: 16,
  },
  dateButton: {
    backgroundColor: "#FFD700",
    padding: 12,
    borderRadius: 8,
    marginVertical: 16,
    alignItems: "center",
  },
  dateButtonText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#398664",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
