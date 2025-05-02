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
          headerShown: false,
        }}
      >
        <Stack.Screen
          // https://stackoverflow.com/questions/76108450/presenting-modal-on-tabs-using-react-native-and-expo-router
          name="(modals)/profileModal" // add a routeName with name='your-modal'
          options={{
            presentation: "modal",
          }}
        />
        <Stack.Screen
          // https://stackoverflow.com/questions/76108450/presenting-modal-on-tabs-using-react-native-and-expo-router
          name="(modals)/walletModal" // add a routeName with name='your-modal'
          options={{
            presentation: "modal",
          }}
        />
      </Stack>
    </AuthProvider>
  );
};

export default _layout;

const styles = StyleSheet.create({});
