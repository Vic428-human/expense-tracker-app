import { StyleSheet, Text, TextStyle, View } from "react-native";
import React from "react";
import { TypoProps } from "@/types";
import { verticalScale } from "@/utils/styling";
import { colors } from "@/constants/theme";

const Typo = ({ style, ...props }: TypoProps) => {
  const textStyles: TextStyle = {
    fontSize: props.size ? verticalScale(props.size) : verticalScale(18),
    color: props.color ? props.color : colors.text,
    fontWeight: props.fontWeight ? props.fontWeight : "normal",
  };
  return (
    <View>
      <Text style={[textStyles, style]} {...props.textProps}>
        {props.children}
      </Text>
    </View>
  );
};

export default Typo;

const styles = StyleSheet.create({});
