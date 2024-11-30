import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { Calendar } from "react-native-calendars";

export default function EmotionCalendar() {
  const [emotions, setEmotions] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  const getEmotionEmoji = (feeling) => {
    const emotionMap = {
      neutral: "😐",
      sadness: "😢",
      anger: "😡",
      anxiety: "😟",
      happy: "😊",
      surprise: "😳",
      disgust: "🤢",
    };

    return emotionMap[feeling] || "";
  };

  const fetchEmotions = async (year, month) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://43.203.46.58:8080/api/diaries/monthly-feelings?year=${year}&month=${month}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch emotions");
      }

      const result = await response.json();
      const fetchedEmotions = {};

      result.result.forEach((item) => {
        fetchedEmotions[item.date] = {
          emoji: getEmotionEmoji(item.feeling),
          emotion: item.feeling,
        };
      });

      setEmotions((prev) => ({ ...prev, ...fetchedEmotions }));
    } catch (error) {
      console.error("Error fetching emotions:", error);
      Alert.alert("Error", "Failed to load emotions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmotions(selectedDate.year, selectedDate.month);
  }, [selectedDate]);

  const renderDay = (day) => {
    const { dateString, day: dayNumber } = day;
    const emotion = emotions[dateString];

    return (
      <View
        style={[
          styles.dayContainer,
          emotion && styles.markedDayContainer,
        ]}
      >
        <Text
          style={[
            styles.dateText,
            emotion && styles.markedDateText,
          ]}
        >
          {dayNumber}
        </Text>
        <Text style={styles.emoji}>{emotion ? emotion.emoji : ""}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SookLog</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#398664" />
      ) : (
        <Calendar
          current={`${selectedDate.year}-${selectedDate.month
            .toString()
            .padStart(2, "0")}-01`}
          markingType={"custom"}
          dayComponent={({ date }) => renderDay(date)}
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
          onMonthChange={(month) => {
            console.log("Selected month:", month);
            setSelectedDate({ year: month.year, month: month.month });
          }}
          style={styles.calendar}
          theme={{
            calendarBackground: "#fff",
            todayTextColor: "#4D6F5A",
            dayTextColor: "#4D6F5A",
            arrowColor: "#4D6F5A",
            monthTextColor: "#4D6F5A",
            textDayFontSize: 20,
            textMonthFontSize: 24,
            textDayHeaderFontSize: 16,
          }}
        />
      )}
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
    aspectRatio: 1,
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
    fontSize: 20,
    height: 24,
  },
  markedDayContainer: {
    backgroundColor: "#236322",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  markedDateText: {
    color: "#d5e3d9",
  },
});
