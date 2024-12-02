import React, { useContext, useState } from "react";
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
import { useRouter } from "expo-router";
import { QuestionContext } from "./QuestionContext"; // Context 가져오기

export default function WriteScreen() {
  const { question } = useContext(QuestionContext); // Context에서 question 가져오기
  const [title, setTitle] = useState(question || ""); // Context에서 받은 question을 title 기본값으로 설정
  const [diaryText, setDiaryText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

    setIsLoading(true);

    try {
      // API 호출
      const response = await fetch(
        "http://43.203.46.58:8080/api/diaries?memberId=1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content: diaryText,
            weather: "sunny",
            dateTime: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit diary");
      }

      const result = await response.json();
      const { feeling } = result.result; // 감정 분석 결과

      router.push(
        `/EmotionResultScreen?date=${formattedDate}&title=${encodeURIComponent(
          title
        )}&diaryText=${encodeURIComponent(
          diaryText
        )}&emotion=${encodeURIComponent(feeling)}` // 결과 화면으로 이동
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
