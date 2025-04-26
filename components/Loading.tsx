import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { colors } from "@/constants/theme";

// size 數值型設定：僅 Android 支援直接指定數字像素大小，iOS 僅支援 'small' 或 'large'
// hidesWhenStopped：此屬性僅 iOS 有效，Android 無效
// ActivityIndicatorProps 讓你能夠靈活控制 loading 指示器的顯示、顏色、大小與隱藏行為，並可結合樣式自訂 UI。
const Loading = ({
  size = "large",
  color = colors.primary,
  hidesWhenStopped = true,
  ...props
}: ActivityIndicatorProps) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
