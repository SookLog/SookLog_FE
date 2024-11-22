import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import * as Calendar from "expo-calendar";

export default function CalendarScreen() {
  const [events, setEvents] = useState([]);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    (async () => {
      // 권한 요청
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        setPermissionGranted(true);
        fetchEvents(); // 이벤트 가져오기
      } else {
        Alert.alert("Permission Denied", "캘린더 접근 권한이 필요합니다.");
      }
    })();
  }, []);

  // 캘린더에서 이벤트 가져오기
  const fetchEvents = async () => {
    try {
      const calendars = await Calendar.getCalendarsAsync();
      if (calendars.length > 0) {
        const defaultCalendar = calendars[0]; // 첫 번째 캘린더 선택
        const now = new Date();
        const events = await Calendar.getEventsAsync(
          [defaultCalendar.id],
          new Date(now.getFullYear(), now.getMonth(), 1), // 이번 달 첫째 날
          new Date(now.getFullYear(), now.getMonth() + 1, 0) // 이번 달 마지막 날
        );
        setEvents(events);
      } else {
        Alert.alert("No Calendars Found", "캘린더를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "캘린더 데이터를 가져오는 중 문제가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendar Events</Text>
      {permissionGranted ? (
        <View style={styles.eventContainer}>
          {events.length > 0 ? (
            events.map((event) => (
              <Text key={event.id} style={styles.eventText}>
                {event.title} - {new Date(event.startDate).toDateString()}
              </Text>
            ))
          ) : (
            <Text style={styles.noEventText}>이번 달 일정이 없습니다.</Text>
          )}
        </View>
      ) : (
        <Text style={styles.permissionText}>캘린더 권한을 허용해주세요.</Text>
      )}
      <Button title="Reload Events" onPress={fetchEvents} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#398664",
  },
  eventContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
  },
  eventText: {
    fontSize: 16,
    color: "#2d4150",
    marginVertical: 4,
  },
  noEventText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 16,
  },
  permissionText: {
    fontSize: 16,
    color: "#888",
    marginBottom: 16,
  },
});
