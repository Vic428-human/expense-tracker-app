import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import BackButton from "@/components/BackButton";
import Input from "@/components/Input";
import * as Icon from "phosphor-react-native";
import { verticalScale } from "@/utils/styling";
import Button from "@/components/Button";
import { useRouter } from "expo-router";

const Login = () => {
  const router = useRouter();
  // 備忘：
  // Type 'string' is not assignable to type 'TextInput'.ts(2322)
  // 是因為你把 useRef<TextInput | null>(null) 當成一個變數來存放「文字內容」，
  // 但這個 ref 其實應該是用來取得元件實體（component instance），而不是用來存值的
  // 存值的話 改要用 useState
  // const emailRef = useRef<TextInput | null>(null); (配合 emailRef.current 這個用法不能這樣定義)

  const emailRef = useRef<string>(""); // 注意型別改成 string
  const passwordRef = useRef<string>(""); // 注意型別改成 string

  const [isLoading, setIsLoading] = useState(false);

  const expensiveFn = () => {
    let z = 0;
    for (let i = 0; i < 10; i++) {
      z = i;
      console.log("z", z);
    }
  };

  const handleSubmit = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Login", "Please fill in all fields.");
    }
    console.log("email", emailRef.current);
    console.log("password", passwordRef.current);
    console.log("good to go");
    setIsLoading(true);
  };

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
            secureTextEntry
          />

          <Typo size={14} color={colors.text} style={{ textAlign: "right" }}>
            Forget Password ?
          </Typo>
          {/*  */}
          <Button loading={isLoading} onPress={handleSubmit}>
            <Typo size={21} fontWeight={"700"} color={colors.black}>
              Login
            </Typo>
          </Button>
        </View>
        <View style={styles.footer}>
          <Typo size={15}>Don't have an account?</Typo>
          <Pressable
            onPress={() => {
              router.navigate("/(auth)/register");
            }}
          >
            <Typo size={15} fontWeight={"700"} color={colors.primary}>
              Sign Up
            </Typo>
          </Pressable>
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
    padding: spacingY._7,
  },
  form: {
    gap: spacingY._20,
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: spacingX._5,
  },
});
