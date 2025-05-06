import { Icon } from "phosphor-react-native";
import React,{ ReactNode } from "react";
import {  TextInput ,TextInputProps, ViewStyle, TouchableOpacityProps, TextProps, TextStyle } from "react-native";

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


// 所有符合 TextInputProps 的屬性 ex: 1.placeHolder 也是一個屬性，不需要所有都列舉出來
export interface InputProps extends TextInputProps {
  inputStyle?: TextStyle;
  icon?: ReactNode; // 代表任何可以由 React 渲染的東西
  containerStyle?: ViewStyle;
  inputRef?: React.RefObject<TextInput>;
} 

export type AuthContextType = {
  user: UserType;
  setUser: Function ;
  // Promise<void> 中的 void，意思是這個 Promise 完成（fulfilled）時，不會有任何值傳給你。
  // 如果回傳物件包涵 success and msg,就是 Promise<{success: boolean, msg: string}>
  login: (email: string, password: string) =>Promise<{success: boolean, msg?: string}>;
  register: (email: string,name : string,password: string) =>Promise<{success: boolean, msg?: string}>;
  updateUserDate: (userId: string) => Promise<void>;
}| null

export type UserType = {
  uid?: string;
  email?: string | null;
  name: string | null;
  image?: any;
} | null

export type HeaderProps = {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  title?: string;
  style?: ViewStyle;
};  

export type accountOptionProps = {
  title: string;
  icon: ReactNode;
  bgColor: string;
  routeName?:any
};

export type ModalWrapperProps = {
  children: ReactNode;
  style?: ViewStyle;
  bg?:string
};

export type UserDataType = {
  name: string;
  image?: any;
} 

export type ResponseType = {
  success: boolean;
  msg?: string;
  data?: any;
}

// createdOrUpdateWallet => 對 firebase wallets collection 的操作 ex: 更新firebase上的wallet collection
// onSnapshot => firebase上會有好幾筆 wallets 的 資料，用 onSnapshot 可以監聽到這些資料的變化，並把這些wallets的資料傳給我  
export type WalletType = {
  id: string; // 識別 wallet 的 id ()
  uid?: string; // 識別 user id
  name: string;
  image?: any;
  amount: number;
  totalIncome: number;
  totalExpense: number;
  created?: Date;
}

export type ImageUploadProps ={
  file?: any;
  onSelect: (file:any) => void;
  onClear: () => void;
  containerStyle?: ViewStyle;
  imageStyle?: ViewStyle;
  placeHolder?: string;
}
