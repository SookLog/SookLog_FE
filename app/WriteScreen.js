import React, { useState } from "react";
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

export default function WriteScreen() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [diaryText, setDiaryText] = useState("");
  const [weather, setWeather] = useState("☀️"); // 기본값
  const [isLoading, setIsLoading] = useState(false);

  const today = new Date();
  const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`;

  const handleComplete = async () => {
    if (!title || !diaryText) {
      Alert.alert("Incomplete", "Please fill in all fields before submitting.");
      return;
    }

    setIsLoading(true);

    const data = {
      title,
      content: diaryText,
      weather,
      dateTime: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://172.20.23.158:8080/api/diaries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        Alert.alert("Success", "Diary saved successfully!");
        router.push({
          pathname: "/EmotionResultScreen",
          params: {
            emotion: result.emotion || "기쁨"
          },
        });
      } else {
        const error = await response.json();
        Alert.alert("Error", error.message || "Failed to save diary.");
      }
    } catch (error) {
      console.error("Error posting diary:", error);
      Alert.alert("Error", "An error occurred while saving the diary.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>SookLog</Text>

        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>DATE: {formattedDate}</Text>
          <View style={styles.emojiContainer}>
            {["☀️", "☁️", "🌧️","❄️"].map((emoji) => (
              <TouchableOpacity
                key={emoji}
                style={[
                  styles.emojiButton,
                  weather === emoji && styles.selectedEmojiButton,
                ]}
                onPress={() => setWeather(emoji)}
              >
                <Text style={styles.emojiText}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#398664" />
            <Text style={styles.loadingText}>감정 분석 중입니다. 잠시만 기다려주세요</Text>
          </View>
        ) : (
          <>
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
              <Text style={styles.submitButtonText}>작성 완료</Text>
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
  emojiContainer: {
    flexDirection: "row",
  },
  emojiButton: {
    marginLeft: 8,
    padding: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  selectedEmojiButton: {
    backgroundColor: "#398664",
    borderColor: "#398664",
  },
  emojiText: {
    fontSize: 18, // 크기 조정
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
    color: '#398664',
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
