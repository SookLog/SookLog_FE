import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";

export default function SearchScreen() {
  const [question, setQuestion] = useState(""); // 질문 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  // API 호출 함수
  const fetchQuestion = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://43.203.46.58:8080/api/questions/random"); // API 호출
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setQuestion(result.result); // API 응답의 result 값을 설정
    } catch (error) {
      console.error("Error fetching question:", error);
      setQuestion("Q. 질문을 불러오는 데 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트 마운트 시 API 호출
  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>SookLog</Text>

      {/* Recommendation Section */}
      <View style={styles.recommendationSection}>
        <Text style={styles.recommendationTitle}>오늘의 추천 일기</Text>

        {/* 질문 표시 */}
        <View style={styles.questionBox}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#398664" />
          ) : (
            <Text style={styles.questionText}>{`Q. ${question}`}</Text>
          )}
        </View>

        {/* 버튼 */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>이 주제로 일기 쓰러 가기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={fetchQuestion}>
            <Text style={styles.actionText}>주제 다시 정하기</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    marginBottom: 16,
  },
  recommendationSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  recommendationTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#398664",
    marginBottom: 16,
  },
  questionBox: {
    width: "90%",
    padding: 20,
    backgroundColor: "#e5f5ec",
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#398664",
  },
  questionText: {
    fontSize: 16,
    color: "#398664",
    fontWeight: "bold",
    textAlign: "center",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#398664",
  },
  actionText: {
    fontSize: 14,
    color: "#398664",
  },
});
