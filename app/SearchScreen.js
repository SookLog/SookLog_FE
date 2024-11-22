import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>SookLog</Text>

      {/* Recommendation Section */}
      <View style={styles.recommendationSection}>
        <Text style={styles.recommendationTitle}>오늘의 추천 일기</Text>
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>Q. 가장 기억에 남았던 일이 있나요?</Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>이 주제로 일기 쓰러 가기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
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
