import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "@/context/authContext";

const _layout = () => {
  return (
    <AuthProvider title={""}>
      {/* Children */}
      <Stack
        screenOptions={{
          headerShown: false, // 隱藏Header Title
        }}
      ></Stack>
    </AuthProvider>
  );
};

export default _layout;

const styles = StyleSheet.create({});
