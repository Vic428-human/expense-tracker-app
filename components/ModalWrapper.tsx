import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ModalWrapperProps } from "@/types";
import { spacingY } from "@/constants/theme";

const isIOS = Platform.OS === "ios";
const ModalWrapper = ({ style, ...props }: ModalWrapperProps) => {
  return (
    <View
      style={[styles.container, { backgroundColor: props.bg }, style && style]}
    >
      {props.children}
    </View>
  );
};

export default ModalWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1, // take full space
    paddingTop: isIOS ? spacingY._15 : 50,
    paddingBottom: isIOS ? spacingY._20 : spacingY._10,
  },
});
