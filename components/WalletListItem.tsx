import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { WalletType } from "@/types";
import { Router } from "expo-router";
import { verticalScale } from "@/utils/styling";
import { colors, radius, spacingX } from "@/constants/theme";
import { Image } from "expo-image";
import * as Icon from "phosphor-react-native";
import Typo from "./Typo";

const WalletListItem = ({
  item,
  index,
  router,
}: {
  item: WalletType;
  index: number;
  router: Router;
}) => {
  return (
    <View>
      <TouchableOpacity
        key={item.id}
        style={styles.container}
        // onPress={() => this._onPress(item)}
      >
        <View style={styles.imageContainer}>
          <Image
            source={item?.image}
            style={{ flex: 1 }} // 圖片沒顯示出來用這個
            contentFit="cover"
            transition={1000} // 數字愈大顯示圖片數字愈慢
          />
        </View>
        <View style={styles.nameContainer}>
          <Typo size={16}>{item.name}</Typo>
          <Typo size={14} color={colors.neutral400}>
            {item.amount}
          </Typo>
        </View>
        <Icon.CaretRight
          size={verticalScale(20)}
          color={colors.white}
          weight="bold"
        />
      </TouchableOpacity>
    </View>
  );
};

export default WalletListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(17),
  },
  imageContainer: {
    height: verticalScale(55),
    width: verticalScale(55),
    borderRadius: radius._12,
    borderColor: colors.neutral600,
    borderWidth: 1,
    borderCurve: "continuous",
    overflow: "hidden",
  },
  nameContainer: {
    flex: 1,
    gap: 2,
    marginLeft: spacingX._10,
  },
});
