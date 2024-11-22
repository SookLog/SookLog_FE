import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";

export default function RootLayout() {
  const router = useRouter(); // 라우팅을 위한 router 객체

  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={({ route }) => ({
          // SignUpScreen에서는 header와 footer 숨김
          headerShown: route.name !== "screens/SignUpScreen",
        })}
      >
        {/* Header: SignUpScreen에서는 제외 */}
        <Stack.Screen name="index" options={{ header: () => <Header /> }} />

        {/* Stack Navigation */}
        <Stack />
      </Stack>

      {/* Footer: SignUpScreen에서는 제외 */}
      <Footer router={router} />
    </View>
  );
}

// Header 컴포넌트
const Header = () => (
  <View style={styles.header}>
    <Text style={styles.headerText}>SookLog</Text>
  </View>
);

// Footer 컴포넌트
const Footer = ({ router }) => (
  <View style={styles.footer}>
    {/* 홈 아이콘 */}
    <TouchableOpacity onPress={() => router.push("/HomeScreen")}>
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
  </View>
);

const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4D6F5A",
  },
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


