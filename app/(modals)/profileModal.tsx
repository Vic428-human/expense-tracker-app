import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import ModalWrapper from "@/components/ModalWrapper";
import { colors, spacingX, spacingY } from "@/constants/theme";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import { verticalScale } from "@/utils/styling";
import { Image } from "expo-image";
import { getProfileImage } from "@/services/imageService";
import { useAuth } from "@/context/authContext";
import * as Icon from "phosphor-react-native";

const profileModal = () => {
  const { user } = useAuth();
  return (
    <ModalWrapper>
      <View style={styles.container}>
        {/* TODO: 這邊的文字想要置中，但是會把icon跟著移動，尚未排除 */}
        <Header
          title="Update Profile"
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._10 }}
        />
        {/* https://reactnative.dev/docs/scrollview */}
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.avatarContainer}>
            {/* https://docs.expo.dev/versions/latest/sdk/image/ */}
            <Image
              style={styles.avatar}
              source={getProfileImage(user?.image)}
              contentFit="cover"
              transition={1000}
            />
            <TouchableOpacity style={styles.editIcon}>
              <Icon.Pencil size={verticalScale(20)} color={colors.neutral800} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ModalWrapper>
  );
};

export default profileModal;

const styles = StyleSheet.create({
  container: {
    flex: 1, // take full space
    justifyContent: "space-between",
    paddingHorizontal: spacingY._20,
  },
  contentContainer: {
    gap: spacingY._30,
    marginTop: spacingY._15,
  },
  avatarContainer: {
    alignSelf: "center",
    position: "relative", //  因為會讓edit icon定位在某張圖片上面，所以父層要用relative
  },
  avatar: {
    alignSelf: "center",
    height: verticalScale(135),
    width: verticalScale(135),
    backgroundColor: colors.neutral300,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: colors.neutral500,
  },
  editIcon: {
    position: "absolute",
    bottom: spacingY._5,
    right: spacingY._7,
    backgroundColor: colors.neutral100,
    borderRadius: 100,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: spacingY._7,
  },
});
