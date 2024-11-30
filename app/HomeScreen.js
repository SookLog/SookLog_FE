import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Svg, { Rect, Circle, Image as SvgImage } from "react-native-svg";
import axios from "axios";

export default function HomeScreen() {
  const [treeStage, setTreeStage] = useState(0); // 나무 성장 단계 (0~9)

  useEffect(() => {
    // API 호출
    const fetchTreeGrowth = async () => {
      try {
        const response = await axios.get("http://43.203.46.58:8080/api/tree/growth");
        if (response.data.isSuccess) {
          const result = response.data.result;
          console.log("Tree Growth Stage:", result);
          setTreeStage(result); // 결과값으로 나무 단계 설정
        } else {
          Alert.alert("Error", "API 호출에 실패했습니다.");
        }
      } catch (error) {
        console.error("Error fetching tree growth:", error);
        Alert.alert("Error", "API 호출 중 오류가 발생했습니다.");
      }
    };

    fetchTreeGrowth();
  }, []); // 컴포넌트 로드 시 한 번 실행

  // 각 단계별 나무 이미지 경로
  const treeImages = [
    require("../assets/seed.png"), // 0: 씨앗
    require("../assets/sprout.png"), // 1: 새싹
    require("../assets/small_tree.png"), // 2: 작은 나무
    require("../assets/medium_tree.png"), // 3: 중간 나무
    require("../assets/big_tree.png"), // 4: 큰 나무
    require("../assets/tree_with_fruit.png"), // 5: 열매가 달린 나무
    require("../assets/tree_with_more_fruit.png"), // 6: 열매가 더 많은 나무
    require("../assets/tree_rich_fruit.png"), // 7: 풍성한 열매 나무
    require("../assets/tree_almost_done.png"), // 8: 거의 완성된 나무
    require("../assets/apple.png"), // 9: 사과
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>SookLog</Text>

      {/* Tree Section */}
      <View style={styles.treeContainer}>
        <Text style={styles.subtitle}>쑥쑥이가 자라요!</Text>
        <Svg height="400" width="200" viewBox="0 0 100 150">
          {/* 이미지로 나무 상태 표시 */}
          <SvgImage
            x="10"
            y="10"
            width="80"
            height="130"
            href={treeImages[treeStage]} // 현재 단계에 해당하는 이미지
          />
        </Svg>
        <Text style={styles.text}>현재 나무 단계: {treeStage}</Text>
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
