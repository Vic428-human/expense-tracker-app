import { Href } from "expo-router";
import { Firestore, Timestamp } from "firebase/firestore";
import { Icon } from "phosphor-react-native";
import React, { ReactNode } from "react";
import {  TextInput,TextInputProps, ViewStyle, TouchableOpacityProps, TextProps, TextStyle } from "react-native";

export type ScreenWrapperProps = {
  children: ReactNode; 
  style?: TextStyle; // <Text>（需用 TextStyle）
};

export type TypoProps = {
  style?: TextStyle;
  size?: number;
  color?: string;
  fontWeight?: TextStyle["fontWeight"]; // 無需一一列舉 ex: 'normal'、'bold'、'100'
  textProps?: TextProps;
  children: any | null;
};

// <Image>（需用 ImageStyle）
export interface CustomButtonProps extends TouchableOpacityProps  {
  style?: ViewStyle; // 定義視圖類元件（如 <View>、<TouchableOpacity> 等
  onPress?: () => void;
  loading?: boolean;
  children: any | null;
};


export type BackButtonProps = {
  style?: ViewStyle;
  iconSize?: number;
};


// 所有符合 TextInputProps 的屬性 ex: 1.placeHolder也是一個屬性，不需要所有都列舉出來
export interface InputProps extends TextInputProps {
  inputStyle?: TextStyle;
  icon?: React.ReactNode; // 代表任何可以由 React 渲染的東西
  containerStyle?: ViewStyle;
  inputRef?: React.RefObject<TextInput>;
} 
