import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import { verticalScale } from "@/utils/styling";
import { useAuth } from "@/context/authContext";
import { Image } from "expo-image";
import { getProfileImage } from "@/services/imageService";
import { accountOptionProps } from "@/types";
import * as Icon from "phosphor-react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  SlideInUp,
} from "react-native-reanimated";
import { auth } from "@/config/firebase";
import { useRouter } from "expo-router";

const Profile = () => {
  // can't not read prototype of undefined
  // const fadeAnim = useRef(new Animated.Value(0)).current;
  const { user } = useAuth();
  const router = useRouter();

  // 創造一個物件陣列，物件有好幾個，每個物件都有 accountOptionProps 裡面具備的屬性
  const accountOptions: accountOptionProps[] = [
    {
      title: "Edit Profile",
      icon: <Icon.User />,
      bgColor: "#6366f1",
      routeName: "/(modals)/profileModal",
    },
    {
      title: "Setting",
      icon: <Icon.GearSix />,
      bgColor: "#059669",
    },
    {
      title: "Privacy Policy",
      icon: <Icon.Lock />,
      bgColor: colors.neutral600,
    },
    {
      title: "Logout",
      icon: <Icon.Power />,
      bgColor: "#e11d48",
    },
  ];

  const handleLogout = async () => {
    await auth.signOut();
  };
  // https://reactnative.dev/docs/alert
  const showLogoutAlert = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: handleLogout,
      },
    ]);
  };

  const handlePress = (option: accountOptionProps) => {
    if (option?.title === "Logout") {
      showLogoutAlert();
    }
    if (option?.routeName) {
      router.push(option.routeName);
    }
  };
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header
          title="Profile"
          style={{ marginVertical: spacingY._10 }}
          leftIcon={<BackButton />}
        />

        {/* user info */}
        <Animated.View
          entering={FadeInDown.duration(400).delay(600)}
          style={styles.userInfo}
        >
          {/* avatar */}
          <View>
            {/* user image  */}
            {/* https://docs.expo.dev/versions/latest/sdk/image/ */}
            <Image
              style={styles.avatar}
              source={getProfileImage(user?.image)}
              // placeholder={{ blurhash }}
              contentFit="cover"
              transition={1000}
            />
          </View>
          {/* name &  email */}
          <View>
            <Typo size={24} fontWeight={"600"} color={colors.neutral100}>
              {user?.name}
            </Typo>
            <Typo size={15} color={colors.neutral400}>
              {user?.email}
            </Typo>
          </View>
        </Animated.View>

        <View style={styles.accountOption}>
          {accountOptions.map((option, index) => (
            <Animated.View
              style={styles.listItem}
              key={index}
              // 由上落下的動畫
              entering={SlideInUp.duration(400)
                .delay(index * 50)
                .springify()
                .damping(20)}
            >
              <TouchableOpacity
                style={styles.flexRow}
                // 這會在渲染時馬上執行 handlePress(option)，並把回傳值（void）給 onPress，造成型別錯誤
                // onPress={handlePress(option)}
                onPress={() => handlePress(option)}
              >
                <View
                  style={[
                    styles.listIcon,
                    { backgroundColor: option?.bgColor },
                  ]}
                >
                  {option.icon && option.icon}
                </View>
                {/*這邊加了flex 1 不曉得為什麼沒有對齊 */}
                <Typo size={16} fontWeight={"500"}>
                  {option?.title}
                </Typo>
                <Icon.CaretRight
                  size={verticalScale(20)}
                  weight="bold"
                  color={colors.white}
                  style={{ marginLeft: "auto" }} // 這一行讓箭頭靠右
                />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
  },
  userInfo: {
    marginTop: verticalScale(30),
    alignItems: "center",
    gap: spacingY._15,
  },
  avatar: {
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
    backgroundColor: colors.neutral300,
    alignSelf: "center",
  },
  accountOption: {
    marginTop: spacingY._35,
  },
  listItem: {
    marginBottom: verticalScale(17),
    justifyContent: "center",
  },
  flexRow: {
    flexDirection: "row",
    gap: spacingX._10,
    alignItems: "center",
  },
  listIcon: {
    width: verticalScale(44),
    height: verticalScale(44),
    backgroundColor: colors.neutral500,
    borderRadius: radius._15,
    borderCurve: "continuous",
    alignItems: "center",
    justifyContent: "center",
  },
});
