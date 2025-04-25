import { Href } from "expo-router";
import { Firestore, Timestamp } from "firebase/firestore";
import { Icon } from "phosphor-react-native";
import React, { ReactNode } from "react";


// add export type for children and styles
export type ScreenWrapperProps = {
    children: ReactNode;
    style?: any;
  };    