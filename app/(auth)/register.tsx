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
import { useAuth } from "@/context/authContext";

const Register = () => {
  const router = useRouter();

  const nameRef = useRef<string>("");
  const emailRef = useRef<string>("");
  const passwordRef = useRef<string>("");

  const [isLoading, setIsLoading] = useState(false);

  // 直接調用 useAuth 會有問題，需要在最外層的 _layout.tsx 補上 AuthProvider
  const { register: registerUser } = useAuth();

  const handleSubmit = async () => {
    if (!passwordRef.current || !nameRef.current || !emailRef.current) {
      Alert.alert("Sign Up", "Please fill in all fields.");
    }
    setIsLoading(true);
    const response = await registerUser(
      emailRef.current,
      nameRef.current,
      passwordRef.current
    );
    setIsLoading(false);
    console.log("registerUser response==>", response);
    if (!response.success) {
      Alert.alert("Sign Up", response.msg);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton />
        <View style={{ gap: 5, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={"800"}>
            Let's
          </Typo>
          <Typo size={30} fontWeight={"800"}>
            Get Started
          </Typo>
        </View>

        <View style={styles.form}>
          <Typo size={20} fontWeight={"600"} color={colors.textLighter}>
            Create an account to track your expenses
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
            onChangeText={(text) => (nameRef.current = text)} //  ref 其實應該是用來取得元件實體（
            placeholder="Enter your Name"
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

          <Button loading={isLoading} onPress={handleSubmit}>
            <Typo size={21} fontWeight={"700"} color={colors.black}>
              Sign Up
            </Typo>
          </Button>
        </View>
        <View style={styles.footer}>
          <Typo size={15}>Already have an Account?</Typo>
          <Pressable
            // navigate 會回到之前的紀錄，跟push不一樣。
            // 但如果回到 login ， 再用navigate會回到sign up，就不能重複回到先前login紀錄，畫面會卡住，因為login已經回去過一次了
            onPress={() => {
              router.navigate("/(auth)/login");
            }}
          >
            <Typo size={15} fontWeight={"700"} color={colors.primary}>
              Login
            </Typo>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Register;

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
