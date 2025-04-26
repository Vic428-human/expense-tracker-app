import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { CustomButtonProps } from "@/types";
import { colors, radius } from "@/constants/theme";
import Loading from "./Loading";
import { verticalScale } from "@/utils/styling";

const Button = ({ style, loading = false, ...props }: CustomButtonProps) => {
  if (loading) {
    return (
      <View style={[styles.button, style, { backgroundColor: "transparent" }]}>
        {/* loading */}
        <Loading />
      </View>
    );
  }
  return (
    <View>
      <TouchableOpacity onPress={props.onPress} style={[styles.button, style]}>
        {props.children}
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius._10,
    borderCurve: "continuous",
    height: verticalScale(52),
    justifyContent: "center",
    alignItems: "center",
  },
});
