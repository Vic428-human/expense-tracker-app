import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { InputProps } from "@/types";
import { verticalScale } from "@/utils/styling";
import { colors, radius, spacingX } from "@/constants/theme";

const Input = ({ ...props }: InputProps) => {
  return (
    <View style={[styles.container]}>
      {props.icon && props.icon}
      <TextInput
        ref={props.inputRef && props.inputRef}
        style={[styles.input]}
        placeholderTextColor={colors.neutral400}
        {...props}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: verticalScale(54),
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: radius._17,
    borderCurve: "continuous",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacingX._15, // 避免輸入文字靠左對齊，要留一些間距
    gap: spacingX._10, // 跟 icon 的間距
  },
  input: {
    flex: 1,
    color: colors.white,
    fontSize: verticalScale(14),
  },
});
