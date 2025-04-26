import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import Button from "@/components/Button";
import Animated, {
  FadeIn,
  FadeInDown,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const welcome = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View>
          <TouchableOpacity style={styles.logginBUtton}>
            <Typo fontWeight={"500"}>Sign In</Typo>
          </TouchableOpacity>
          {/* https://blog.csdn.net/qq_34812958/article/details/144585617 */}
          {/* https://docs.swmansion.com/react-native-reanimated/docs/layout-animations/entering-exiting-animations/ */}
          <Animated.Image
            entering={FadeIn.duration(5000)}
            source={
              true
                ? require("../../assets/images/welcome.png")
                : require("../../assets/images/welcome.png")
            }
            resizeMode="contain"
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.footer}>
          <Animated.View
            //由下往上動畫
            entering={FadeInDown.duration(1000)
              .delay(100)
              .springify()
              .damping(12)}
            style={{ alignItems: "center" }}
          >
            <Typo size={30} fontWeight={"800"}>
              Always take control
            </Typo>
            <Typo size={30} fontWeight={"800"}>
              of your finances
            </Typo>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(1000)
              .delay(200)
              .springify()
              .damping(30)}
            style={{ alignItems: "center", gap: 2 }}
          >
            <Typo size={17} color={colors.textLight}>
              Finance must arrange to set a better
            </Typo>
            <Typo size={17} color={colors.textLight}>
              lifestyle in fucture
            </Typo>
          </Animated.View>

          <View style={styles.buttonContainer}>
            <Button>
              <Typo size={22} color={colors.neutral900} fontWeight={"600"}>
                Get Started
              </Typo>
            </Button>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between", // 預設是上下對齊
    padding: spacingY._7,
  },
  logginBUtton: {
    alignSelf: "flex-end",
    marginRight: spacingX._20,
  },
  welcomeImage: {
    width: "100%",
    height: verticalScale(300),
    alignSelf: "center",
    marginTop: verticalScale(100),
  },
  footer: {
    backgroundColor: colors.neutral900,
    alignItems: "center",
    paddingBottom: verticalScale(30),
    paddingTop: verticalScale(45),
    shadowColor: colors.white,
    gap: spacingY._20,
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 25,
    elevation: 10,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: spacingX._25,
  },
});
