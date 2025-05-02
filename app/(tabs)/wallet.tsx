import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import Typo from "@/components/Typo";
import { verticalScale } from "@/utils/styling";
import * as Icon from "phosphor-react-native";
import { useRouter } from "expo-router";

const wallet = () => {
  const router = useRouter();
  /**
   * Retrieves the total balance.
   *
   * @returns {number} The total balance as a fixed number.
   */

  const getTotalBalance = () => {
    return 2344;
  };
  return (
    <ScreenWrapper style={{ backgroundColor: colors.black }}>
      {/* container */}
      <View style={styles.container}>
        {/* balance */}
        <View style={styles.balanceView}>
          <View style={{ alignItems: "center" }}>
            <Typo size={45} fontWeight={"500"}>
              ${getTotalBalance()?.toFixed(2)}
            </Typo>
            <Typo size={16} color={colors.neutral300}>
              Total Balance
            </Typo>
          </View>
        </View>
        {/* wallets  */}
        <View style={styles.wallets}>
          {/* header */}
          <View style={styles.flexRow}>
            <Typo size={22} fontWeight={"500"}>
              My Wallets
            </Typo>
            {/* ICON */}
            <TouchableOpacity
              onPress={() => router.push("/(modals)/walletModal")}
            >
              <Icon.PlusCircle
                size={verticalScale(33)}
                weight="fill"
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
          {/* TODO: wallets list */}
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  balanceView: {
    justifyContent: "center",
    alignItems: "center",
    height: verticalScale(160), // 固定一個高度，下面的 wallets 要填滿剩餘的空間
    backgroundColor: colors.black,
  },
  wallets: {
    flex: 1,
    borderTopRightRadius: radius._30,
    borderTopLeftRadius: radius._30,
    backgroundColor: colors.neutral900,
    padding: spacingX._20,
    paddingTop: spacingX._25,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacingY._10,
  },
});
