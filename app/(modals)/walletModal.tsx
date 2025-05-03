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
import { WalletType } from "@/types";
import Button from "@/components/Button";
import { updateUser } from "@/services/userService";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import ImageUpload from "@/components/ImageUpload";
import { createdOrUpdateWallet } from "@/services/walletService";

const walletModal = () => {
  const router = useRouter();
  const { user, updateUserDate } = useAuth();
  const [wallet, setWallet] = useState<WalletType>({
    id: "",
    name: "",
    image: null, // result.assets[0]
    amount: 0,
    totalIncome: 0,
    totalExpense: 0,
  });
  const [image, setImage] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    let { name, image } = wallet; // image這格物件是=> {"assets": [{}], "type": "image", "uri" }
    name = name.trim();
    // image = image.trim(); 會出現 TypeError，因為js的 trim() 不會對 null 做處理
    if (!name || !image) {
      Alert.alert("Wallet", "Please fill in all fields");
      return;
    }

    const data: WalletType = {
      uid: user?.uid as string,
      name,
      image,
      id: "",
      amount: 0,
      totalIncome: 0,
      totalExpense: 0,
    };
    // TODO: include wallet id if updating

    setLoading(true);
    const response = await createdOrUpdateWallet(data);
    setLoading(false);
    console.log("createdOrUpdateWallet response==>", response);
    if (!response.success) {
      Alert.alert("Wallet", response.msg);
    } else {
      router.back();
    }
  };

  return (
    <ModalWrapper style={styles.wrapper}>
      <View style={styles.container}>
        {/* TODO: 這邊的文字想要置中，但是會把icon跟著移動，尚未排除 */}
        <Header
          title="New Wallet"
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._10 }}
        />
        {/* https://reactnative.dev/docs/scrollview */}
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Wallet Name:</Typo>
            <Input
              placeholder="Salary"
              value={wallet.name}
              onChangeText={(text) => setWallet({ ...wallet, name: text })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Wallet Icon:</Typo>
            {/* Image input */}
            <ImageUpload
              onClear={() => setWallet({ ...wallet, image: null })}
              onSelect={(file) => setWallet({ ...wallet, image: file })}
              file={wallet.image}
              placeHolder="Upload Image"
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <Button onPress={() => onSubmit()}>
            <Typo color={colors.black} fontWeight={"700"}>
              Add wallet
            </Typo>
          </Button>
        </View>
      </View>
    </ModalWrapper>
  );
};

export default walletModal;

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
