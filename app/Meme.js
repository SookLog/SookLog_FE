import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";

export default function Meme() {
  const [imageUrl, setImageUrl] = useState(null); // 추천 짤 이미지 URL 상태
  const [isLoading, setIsLoading] = useState(false);

  // Mock API 호출 (테스트용)
  const fetchRecommendedGif = () => {
    setIsLoading(true);

    // Mock 데이터 (로컬 이미지 URL 배열)
    const mockImages = [
     "https://i.pinimg.com/736x/6c/e3/e3/6ce3e3487dcbbccc01174e59a9f590ca.jpg",
     "https://i.pinimg.com/736x/6c/e3/e3/6ce3e3487dcbbccc01174e59a9f590ca.jpg",
     "https://i.pinimg.com/736x/6c/e3/e3/6ce3e3487dcbbccc01174e59a9f590ca.jpg",
     "https://i.pinimg.com/736x/6c/e3/e3/6ce3e3487dcbbccc01174e59a9f590ca.jpg,"
    ];

    // 랜덤으로 Mock 이미지 선택
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * mockImages.length);
      setImageUrl(mockImages[randomIndex]);
      setIsLoading(false);
    }, 1000); // 1초 지연으로 비동기 API 흉내
  };

  // 컴포넌트가 마운트될 때 Mock 이미지 요청
  React.useEffect(() => {
    fetchRecommendedGif();
  }, []);

  return (
    <View style={styles.container}>
      {/* 상단 제목 */}
      <Text style={styles.title}>SookLog</Text>

      {/* 중간 내용 */}
      <View style={styles.content}>
        <Text style={styles.subtitle}>오늘의 추천 짤</Text>

        {/* 로딩 상태 */}
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#398664" />
            <Text style={styles.loadingText}>
              추천 짤을 로딩 중입니다. 잠시만 기다려주세요.
            </Text>
          </View>
        ) : (
          <>
            {/* 추천 짤 이미지 */}
            {imageUrl && (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: imageUrl }}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
            )}
          </>
        )}

        {/* 새 짤 요청 버튼 */}
        <TouchableOpacity
          style={styles.button}
          onPress={fetchRecommendedGif}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Loading..." : "다른 짤 추천받기"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  /*container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#398664",
    textAlign: "center",
    marginBottom: 16,
  },*/
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#398664",
    textAlign: "center",
    marginVertical: 16,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#398664",
    marginBottom: 50,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#398664",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: "#398664",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#398664",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
