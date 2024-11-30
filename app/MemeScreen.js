import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker"; // 날짜 선택용 패키지

export default function MemeScreen() {
  const router = useRouter();
  const { date: initialDate, emotion } = useLocalSearchParams(); // useLocalSearchParams 사용

  // 상태 관리
  const [selectedDate, setSelectedDate] = useState(new Date(initialDate || Date.now())); // 초기 날짜 설정
  const [showDatePicker, setShowDatePicker] = useState(false);

  // 예시 감정별 짤 데이터
  const memeData = {
    happiness: "https://via.placeholder.com/300x300/FFD700/000000?text=Happy+Meme",
    sadness: "https://via.placeholder.com/300x300/1E90FF/FFFFFF?text=Sad+Meme",
    anger: "https://via.placeholder.com/300x300/FF4500/FFFFFF?text=Angry+Meme",
    surprise: "https://via.placeholder.com/300x300/32CD32/FFFFFF?text=Surprised+Meme",
    neutral: "https://via.placeholder.com/300x300/808080/FFFFFF?text=Neutral+Meme",
  };

  // 감정에 맞는 짤 URL 가져오기
  const memeUrl = memeData[emotion] || memeData.neutral;

  // 날짜 포맷팅 함수
  const formatDate = (date) => {
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>짤 생성 결과</Text>

      <View style={styles.contentContainer}>
        <Text style={styles.text}>작성 날짜: {formatDate(selectedDate)}</Text>
        <Text style={styles.text}>감정: {emotion || "Neutral"}</Text>
        <Image source={{ uri: memeUrl }} style={styles.memeImage} />

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
              setSelectedDate(date);
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
