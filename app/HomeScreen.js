import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Rect, Circle } from "react-native-svg";

export default function HomeScreen() {
  const [positiveDays, setPositiveDays] = useState(0); // 긍정적인 날의 수
  const totalDays = 30; // 전체 날 수

  useEffect(() => {
    // API 대신 Mock Data 사용
    const mockPositiveCount = 22; // 임시 데이터: 긍정적인 날의 수
    setPositiveDays(mockPositiveCount); // 임시 데이터를 상태로 설정
  }, []); // 컴포넌트 로드 시 한 번 실행

  const growth = (positiveDays / totalDays) * 100; // 나무 성장 비율 (0~100)

  return (
    <View style={styles.container}>
    {/* Header */}
    <Text style={styles.title}>SookLog</Text>


      {/* Tree Section */}
      <View style={styles.treeContainer}>
        <Text style={styles.subtitle}>쑥쑥이가 자라요!</Text>
        <Svg height="400" width="200" viewBox="0 0 100 150">
          {/* 나무 줄기 */}
          <Rect
            x="45"
            y={100 - growth} // 성장 비율에 따라 나무 줄기 길이 증가
            width="10"
            height={growth}
            fill="#8B4513"
          />
          {/* 나무 잎 */}
          <Circle
            cx="50"
            cy={100 - growth - 10}
            r={growth / 4} // 성장 비율에 따라 잎 크기 증가
            fill="green"
          />
        </Svg>
        <Text style={styles.text}>
          Positive Days: {positiveDays}/{totalDays}
        </Text>
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
    marginBottom: 120,
  },
  treeContainer: {
    flex: 1, // 나무가 화면의 나머지 공간 차지
    justifyContent: "center",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#398664",
    marginBottom: 100,
  },
  text: {
    fontSize: 16,
    marginTop: 10,
  },
});
