import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ImageUploadProps } from "@/types";
import * as Icon from "phosphor-react-native";
import { colors, radius } from "@/constants/theme";
import Typo from "./Typo";
import { scale, verticalScale } from "@/utils/styling";
import { getFilePath } from "@/services/imageService";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";

const ImageUpload = ({ ...props }: ImageUploadProps) => {
  const onPickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      // allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      props.onSelect(result.assets[0]);
    }
  };
  return (
    <View>
      {!props.file && (
        <View>
          {/* tochable and icon*/}
          <TouchableOpacity onPress={onPickImage} style={styles.inputContainer}>
            {/* icon */}
            <Icon.UploadSimple color={colors.neutral200} />
            {props.placeHolder && <Typo>{props.placeHolder}</Typo>}
          </TouchableOpacity>
        </View>
      )}

      {props.file && (
        <View style={[styles.image, props.imageStyle && props.imageStyle]}>
          <Image
            style={{ flex: 1 }}
            source={getFilePath(props.file)}
            contentFit="cover"
            transition={100}
          />
          <TouchableOpacity onPress={props.onClear} style={styles.deleteIcon}>
            <Icon.XCircle
              size={verticalScale(24)}
              weight="fill"
              color={colors.white}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ImageUpload;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    height: verticalScale(54),
    backgroundColor: colors.neutral700,
    borderWidth: 1,
    borderColor: colors.neutral500,
    borderRadius: 10,
    borderStyle: "dashed",
  },
  image: {
    width: scale(150),
    height: scale(150),
    borderRadius: radius._15,
    overflow: "hidden",
    borderCurve: "continuous",
  },
  deleteIcon: {
    position: "absolute",
    right: scale(6),
    top: scale(6),
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
});
