import { Href } from "expo-router";
import { Firestore, Timestamp } from "firebase/firestore";
import { Icon } from "phosphor-react-native";
import React, { ReactNode } from "react";
import { TextProps, TextStyle } from "react-native";

export type ScreenWrapperProps = {
  children: ReactNode;
  style?: TextStyle;
};

export type TypoProps = {
  style?: TextStyle;
  size?: number;
  color?: string;
  fontWeight?: TextStyle["fontWeight"]; // 無需一一列舉 ex: 'normal'、'bold'、'100'
  textProps?: TextProps;
  children: any | null;
};
