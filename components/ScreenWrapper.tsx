import {
  StatusBar,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { ScreenWrapperProps } from "@/types";
import { colors } from "@/constants/theme";

// get the hegight of the screen by using Dimensions
const { height } = Dimensions.get("window");

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
  let paddingTop = Platform.OS == "android" ? 50 : height * 0.06;

  return (
    <View
      style={[
        { paddingTop, flex: 1, backgroundColor: colors.neutral900 },
        style,
      ]}
    >
      <StatusBar barStyle={"light-content"} />
      {children}
    </View>
  );
};
export default ScreenWrapper;

const styles = StyleSheet.create({});
