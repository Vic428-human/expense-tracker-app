import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BackButtonProps } from "@/types";
import { useRouter } from "expo-router";
import { CaretLeft } from "phosphor-react-native";
import { verticalScale } from "@/utils/styling";
import { colors, radius } from "@/constants/theme";

const BackButton = ({ style, iconSize = 26, ...props }: BackButtonProps) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.back()}
      style={[styles.button, style]}
    >
      {/* https://phosphoricons.com/?q=%22caret%22&weight=%22bold%22 */}
      <CaretLeft
        size={verticalScale(iconSize)}
        weight="bold"
        color={colors.white}
      />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.neutral600,
    padding: 5,
    borderCurve: "continuous",
    alignSelf: "flex-start", // 預設值是 stretch，也就是這個 button 會被拉伸，而 flex-start 只會根據內容自身寬度不會被拉伸
    borderRadius: radius._12,
  },
});
