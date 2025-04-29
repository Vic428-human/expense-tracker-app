import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import { verticalScale } from "@/utils/styling";
import { useAuth } from "@/context/authContext";
import { Image } from "expo-image";

const Profile = () => {
  const { user } = useAuth();
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header
          title="Profile"
          style={{ marginVertical: spacingY._10 }}
          leftIcon={<BackButton />}
        />

        {/* user info */}
        <View style={styles.userInfo}>
          {/* avatar */}
          <View>
            {/* user image  */}
            {/* https://docs.expo.dev/versions/latest/sdk/image/ */}
            <Image
              style={styles.avatar}
              source={user?.image}
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
});
