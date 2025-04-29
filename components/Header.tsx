import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Typo from "./Typo";
import { HeaderProps } from "@/types";
import { colors } from "@/constants/theme";

const Header = ({ style, ...props }: HeaderProps) => {
  return (
    <View style={[styles.container, style]}>
      {props.leftIcon && <View style={styles.leftIcon}>{props.leftIcon}</View>}

      {props.title && (
        <Typo
          size={22}
          fontWeight={"600"}
          style={{
            textAlign: "center",
            width: props.leftIcon ? "100%" : "100%",
          }}
        >
          {props.title}
        </Typo>
      )}
      {/* 右側預留空間，保持標題置中 */}
      {/* <View style={styles.rightSpace} /> */}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  leftIcon: {
    alignSelf: "flex-start",
  },
});
