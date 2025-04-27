import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useRef } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import BackButton from "@/components/BackButton";
import Input from "@/components/Input";
import * as Icon from "phosphor-react-native";
import { verticalScale } from "@/utils/styling";

const Login = () => {
  // 備忘：
  // Type 'string' is not assignable to type 'TextInput'.ts(2322)
  // 是因為你把 useRef<TextInput | null>(null) 當成一個變數來存放「文字內容」，
  // 但這個 ref 其實應該是用來取得元件實體（component instance），而不是用來存值的
  // 存值的話 改要用 useState
  // const emailRef = useRef<TextInput | null>(null); (配合 emailRef.current 這個用法不能這樣定義)

  const emailRef = useRef<string>(""); // 注意型別改成 string
  const passwordRef = useRef<string>(""); // 注意型別改成 string

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton />
        <View style={{ gap: 5, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={"800"}>
            Hey,
          </Typo>
          <Typo size={30} fontWeight={"800"}>
            Welcome Back
          </Typo>
        </View>

        <View style={styles.form}>
          <Typo size={20} fontWeight={"600"} color={colors.textLighter}>
            Login now to track all your expenses
          </Typo>
          <Input
            onChangeText={(text) => (emailRef.current = text)} //  ref 其實應該是用來取得元件實體（
            placeholder="Enter your email"
            icon={
              <Icon.At
                size={verticalScale(32)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />

          <Input
            onChangeText={(text) => (passwordRef.current = text)}
            placeholder="Enter your password"
            icon={
              <Icon.LockKey
                size={verticalScale(32)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />

          <Typo size={16} fontWeight={"400"}>
            Enter your email address
          </Typo>

          <View>
            <Typo size={20} fontWeight={"600"}>
              Password
            </Typo>
            <Typo size={16} fontWeight={"400"}>
              Enter your password
            </Typo>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
    // padding: spacingY._7,
  },
  form: {
    gap: spacingY._20,
  },
});
