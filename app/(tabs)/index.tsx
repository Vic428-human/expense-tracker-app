import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "@/components/Button";
import Typo from "@/components/Typo";
import { auth } from "@/config/firebase";

const index = () => {
  const handleLogout = async () => {
    await auth.signOut();
  };
  return (
    <View>
      <Text>home</Text>
      <Button onPress={handleLogout}>
        <Typo>Logout</Typo>
      </Button>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
