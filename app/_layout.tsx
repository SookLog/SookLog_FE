import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import { QuestionProvider } from "./QuestionContext"; 
export default function RootLayout() {
  const router = useRouter(); // useRouter 사용

  return (
    <QuestionProvider>
    <View style={{ flex: 1 }}>
      {/* Stack Navigation */}
      <Stack
        screenOptions={{
          headerShown: false, // 기본적으로 헤더를 숨김
        }}
      />

      {/* Footer */}
      <Footer router={router} />
    </View>
    </QuestionProvider>
  );
  
}

// Footer 컴포넌트
const Footer = ({ router }: { router: any }) => (
  <View style={styles.footer}>
    {/* 홈 아이콘 */}
    <TouchableOpacity onPress={() => router.push("/")}>
      <Text style={styles.footerText}>🏠</Text>
    </TouchableOpacity>
    {/* 검색 아이콘 */}
    <TouchableOpacity onPress={() => router.push("/SearchScreen")}>
      <Text style={styles.footerText}>🔍</Text>
    </TouchableOpacity>
    {/* 작성 아이콘 */}
    <TouchableOpacity onPress={() => router.push("/WriteScreen")}>
      <Text style={styles.footerText}>✏️</Text>
    </TouchableOpacity>
    {/* 캘린더 아이콘 */}
    <TouchableOpacity onPress={() => router.push("/CalendarScreen")}>
      <Text style={styles.footerText}>📅</Text>
    </TouchableOpacity>
    {/* 짤 생성 아이콘 */}
    <TouchableOpacity onPress={() => router.push("/MemeScreen")}>
      <Text style={styles.footerText}>😂</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  footer: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  footerText: {
    fontSize: 18,
    color: "#4D6F5A",
  },
});
