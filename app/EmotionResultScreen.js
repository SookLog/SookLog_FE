// EmotionResultScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function EmotionResultScreen({ emotion }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emotion Analysis Result</Text>
      <Text style={styles.text}>Your emotion: {emotion}</Text>
     
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
    color: "#398664",
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    color: "#333",
    marginBottom: 8,
  },
});
