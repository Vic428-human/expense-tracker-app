import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs, useSegments } from "expo-router";
import CustomTabs from "@/components/CustomTabs";

const _layout = () => {
  const segment = useSegments();

  // 假設進入到 profile 則把 tabs 隱藏 https://github.com/expo/router/discussions/313
  const hideProfileTabBar = [...segment].includes("profile");

  return (
    // https://docs.expo.dev/router/advanced/tabs/
    <Tabs
      screenOptions={{ tabBarActiveTintColor: "blue", headerShown: false }} // 這裡得設定會被 CustomTabs裡的覆蓋
      tabBar={hideProfileTabBar ? () => null : CustomTabs}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "主頁",
        }}
      />
      <Tabs.Screen name="wallet" options={{ title: "錢包" }} />
      <Tabs.Screen name="profile" options={{ title: "個人" }} />
      <Tabs.Screen
        name="statistic"
        options={{
          title: "統計",
        }}
      />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
