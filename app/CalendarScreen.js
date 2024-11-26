import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Calendar } from "react-native-calendars";

export default function EmotionCalendar() {
  // 감정 데이터를 저장할 상태
  const [emotions, setEmotions] = useState({
    "2023-12-01": { emoji: "😊", emotion: "행복" },
    "2024-11-27": { emoji: "😊", emotion: "행복" },
    "2023-12-02": { emoji: "😢", emotion: "슬픔" },
    "2023-12-03": { emoji: "😡", emotion: "화남" },
    "2023-12-04": { emoji: "😴", emotion: "피곤" },
  });

  // 날짜를 렌더링하는 사용자 정의 컴포넌트
  const renderDay = (day) => {
    const date = day.dateString;
    const emotion = emotions[date];

    return (
      <View
        style={[
          styles.dayContainer,
          emotion && styles.markedDayContainer, // 감정 데이터가 있는 날짜에 스타일 추가
        ]}
      >
        {/* 날짜 표시 */}
        <Text
          style={[
            styles.dateText,
            emotion && styles.markedDateText, // 감정 데이터가 있는 날짜에 텍스트 색상 추가
          ]}
        >
          {day.day}
        </Text>
        {/* 감정 이모티콘 표시 */}
        <Text style={styles.emoji}>{emotion ? emotion.emoji : ""}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>SookLog</Text>

      {/* Calendar */}
      <Calendar
        markingType={"custom"} // 마킹 타입 활성화
        dayComponent={({ date }) => renderDay(date)} // 날짜 렌더링
        onDayPress={(day) => {
          const selectedDate = day.dateString;
          if (emotions[selectedDate]) {
            Alert.alert(
              `Emotion: ${emotions[selectedDate].emotion}`,
              `Emoji: ${emotions[selectedDate].emoji}`
            );
          } else {
            Alert.alert("일기 없음", "이날은 저장된 일기가 없습니다.");
          }
        }}
        style={styles.calendar}
        theme={{
          calendarBackground: "#fff",
          todayTextColor: "#4D6F5A",
          dayTextColor: "#4D6F5A",
          arrowColor: "#4D6F5A",
          monthTextColor: "#4D6F5A",
          textDayFontSize: 20, // 날짜 텍스트 크기
          textMonthFontSize: 24, // 월 텍스트 크기
          textDayHeaderFontSize: 16, // 요일 텍스트 크기
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#398664",
    textAlign: "center",
    marginBottom: 120,
  },
  calendar: {
    width: "100%",
    height: 400,
    borderRadius: 10,
  },
  dayContainer: {
    aspectRatio: 1, // 정사각형 비율 유지
    width: "100%", // 화면 너비의 일정 비율 사용
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  dateText: {
    fontSize: 16,
    color: "#4D6F5A",
  },
  emoji: {
    fontSize: 20, // 이모티콘 크기
    height: 24, // 이모티콘 높이 고정
  },
  // 감정 데이터가 있는 날짜의 커스텀 스타일
  markedDayContainer: {
    backgroundColor: "#236322", // 초록 배경
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  markedDateText: {
    color: "#d5e3d9", // 하얀 텍스트 색상
  },
});
