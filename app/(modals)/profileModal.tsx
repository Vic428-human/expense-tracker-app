import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ModalWrapper from "@/components/ModalWrapper";
import { colors, spacingX, spacingY } from "@/constants/theme";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import { scale, verticalScale } from "@/utils/styling";
import { Image } from "expo-image";
import { getProfileImage } from "@/services/imageService";
import { useAuth } from "@/context/authContext";
import * as Icon from "phosphor-react-native";
import Typo from "@/components/Typo";
import Input from "@/components/Input";
import { UserDataType } from "@/types";
import Button from "@/components/Button";
import { updateUser } from "@/services/userService";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

const profileModal = () => {
  const router = useRouter();
  const { user, updateUserDate } = useAuth();
  const [userData, setUserData] = useState<UserDataType>({
    name: "",
    image: null,
  });
  const [image, setImage] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setUserData({
        name: user?.name as string, // Type 'string | null' is not assignable to type 'string'. 因為有可拿到空字串
        image: user?.image || null,
      });
    }
  }, [user]); // firebase更新後，useAuth 的 user 也會更新，此時觸發

  const onSubmit = async () => {
    let { name, image } = userData;
    console.log("image==>", image);
    name = name.trim();
    // image = image.trim(); 會出現 TypeError，因為js的 trim() 不會對 null 做處理
    if (!name) {
      Alert.alert("User", "Please fill in all fields");
      return;
    }
    setLoading(true);
    const response = await updateUser(user?.uid as string, userData); // { name, image }  不要直接用這個傳進去
    setLoading(false);

    if (!response.success) {
      Alert.alert("User", response.msg);
    } else {
      // 刷新手機介面的內容
      updateUserDate(user?.uid as string);
      router.back();
    }
  };

  // https://docs.expo.dev/versions/latest/sdk/imagepicker/
  const onPickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      // allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("result==>", result);
    if (!result.canceled) {
      setUserData({
        ...userData,
        image: result.assets[0], // 將整個物件派給 image 屬性
      });
    }
  };

  return (
    <ModalWrapper style={styles.wrapper}>
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
              source={getProfileImage(userData?.image)} // 拿剛才收到的新的 物件
              contentFit="cover"
              transition={1000}
            />
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => onPickImage()}
            >
              <Icon.Pencil size={verticalScale(20)} color={colors.neutral800} />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Name:</Typo>
            <Input
              placeholder="Name"
              value={userData.name}
              onChangeText={(text) => setUserData({ ...userData, name: text })}
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <Button onPress={() => onSubmit()}>
            <Typo color={colors.black} fontWeight={"700"}>
              Updated!
            </Typo>
          </Button>
        </View>
      </View>
    </ModalWrapper>
  );
};

export default profileModal;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.neutral900,
  },
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
  inputContainer: {
    gap: spacingY._10,
  },
  footer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scale(12),
    borderTopColor: colors.neutral700,
    paddingTop: spacingY._15,
    paddingHorizontal: spacingX._20,
    borderTopWidth: 1,
    marginBottom: spacingY._5,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: spacingX._25,
  },
});
