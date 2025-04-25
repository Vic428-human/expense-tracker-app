import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors } from "@/constants/theme";

const welcome = () => {
  return (
    <ScreenWrapper>
      <Typo size={30} fontWeight={"700"} color={colors.rose}>
        welcome
      </Typo>
    </ScreenWrapper>
  );
};

export default welcome;

const styles = StyleSheet.create({});
