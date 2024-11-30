import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // AsyncStorage 추가
import { useRouter } from "expo-router";

export default function WriteScreen() {
  const [title, setTitle] = useState("");
  const [diaryText, setDiaryText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [memberId, setMemberId] = useState(null); // memberId 상태 추가
  const router = useRouter();

  // accessToken을 헤더에 추가하여 서버에 요청
  const fetchMemberIdFromServer = async (accessToken) => {
    try {
      const response = await fetch("http://43.203.46.58:8080/test", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`, // Authorization 헤더 사용
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch memberId from server");
      }

      const result = await response.json();
      const { memberId } = result;

      if (!memberId) {
        throw new Error("Server response missing memberId");
      }

      // AsyncStorage에 memberId 저장
      await AsyncStorage.setItem("memberId", memberId);
      setMemberId(memberId);
      console.log("Fetched Member ID from server:", memberId);
    } catch (error) {
      console.error("Error fetching memberId from server:", error);
      Alert.alert("Error", "Failed to retrieve Member ID. Please try again.");
    }
  };

  // AsyncStorage에서 memberId 가져오기 또는 서버에서 로그인 처리
  useEffect(() => {
    const fetchMemberId = async () => {
      try {
        const storedMemberId = await AsyncStorage.getItem("memberId");
        if (storedMemberId) {
          setMemberId(storedMemberId);
          console.log("Stored Member ID:", storedMemberId);
        } else {
          console.log("Member ID not found in AsyncStorage. Fetching from server...");

          // 서버에서 accessToken 사용해 memberId 가져오기
          const accessToken = await AsyncStorage.getItem("accessToken");
          if (!accessToken) {
            throw new Error("Access token not found. Please log in.");
          }

          await fetchMemberIdFromServer(accessToken);
        }
      } catch (error) {
        console.error("Error fetching memberId:", error);
        Alert.alert("Error", "Failed to retrieve Member ID. Please try again.");
      }
    };
    fetchMemberId();
  }, []);

  // 현재 날짜 가져오기
  const today = new Date();
  const formattedDate = `${today.getFullYear()}.${String(
    today.getMonth() + 1
  ).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`;

  // 작성 완료 버튼 동작
  const handleComplete = async () => {
    if (!title || !diaryText) {
      Alert.alert("Incomplete", "Please fill in all fields before submitting.");
      return;
    }

    if (!memberId) {
      Alert.alert("Error", "Member ID is missing. Please log in.");
      return;
    }

    setIsLoading(true);

    try {
      // API 호출
      const response = await fetch(
        `http://43.203.46.58:8080/api/diaries?memberId=${memberId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content: diaryText,
            weather: "sunny", // 임의로 설정 (필요 시 사용자 입력 추가 가능)
            dateTime: new Date().toISOString(), // ISO 형식의 현재 시간
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit diary");
      }

      const result = await response.json();
      console.log("API response:", result);

      // 감정 분석 결과 화면으로 이동
      const { emotion } = result; // API 응답에서 emotion 데이터 사용
      router.push(
        `/EmotionResultScreen?date=${formattedDate}&title=${encodeURIComponent(
          title
        )}&diaryText=${encodeURIComponent(
          diaryText
        )}&emotion=${encodeURIComponent(emotion)}`
      );
    } catch (error) {
      console.error("Error submitting diary:", error);
      Alert.alert("Error", "Failed to submit your diary. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.title}>SookLog</Text>

        {/* Date Section */}
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>DATE: {formattedDate}</Text>
          <View style={styles.icons}>
            <Text style={styles.icon}>😊</Text>
            <Text style={styles.icon}>🌞</Text>
          </View>
        </View>

        {/* 로딩 상태 */}
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#398664" />
            <Text style={styles.loadingText}>
              감정 분석 중입니다. 잠시만 기다려주세요
            </Text>
          </View>
        ) : (
          <>
            {/* Input Section */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Title:</Text>
              <TextInput
                style={styles.input}
                placeholder="Write your title here..."
                placeholderTextColor="#888"
                value={title}
                onChangeText={setTitle}
              />
            </View>
            <View style={styles.diaryContainer}>
              <TextInput
                style={styles.diaryInput}
                placeholder="Write your diary..."
                placeholderTextColor="#888"
                multiline={true}
                value={diaryText}
                onChangeText={setDiaryText}
              />
            </View>
            <TouchableOpacity
              style={[
                styles.submitButton,
                (!title || !diaryText) && styles.submitButtonDisabled,
              ]}
              onPress={handleComplete}
              disabled={!title || !diaryText}
            >
              <Text style={styles.submitButtonText}>Complete</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
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
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#398664",
    borderRadius: 8,
    padding: 8,
  },
  dateText: {
    fontSize: 16,
    color: "#398664",
  },
  icons: {
    flexDirection: "row",
  },
  icon: {
    fontSize: 20,
    marginLeft: 8,
    color: "#FF6347",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#398664",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#398664",
    paddingBottom: 8,
  },
  label: {
    fontSize: 16,
    color: "#398664",
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  diaryContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#398664",
    borderRadius: 8,
    padding: 8,
  },
  diaryInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#398664",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#bbb",
  },
  submitButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
