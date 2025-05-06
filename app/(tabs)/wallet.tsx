import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import Typo from "@/components/Typo";
import { verticalScale } from "@/utils/styling";
import * as Icon from "phosphor-react-native";
import { useRouter } from "expo-router";
import useFetchData from "@/hooks/useFetchData";
import { WalletType } from "@/types";
import { orderBy, where } from "firebase/firestore";
import { useAuth } from "@/context/authContext";
import Loading from "@/components/Loading";
import WalletListItem from "@/components/WalletListItem";

const wallet = () => {
  const router = useRouter();
  const { user } = useAuth();

  // 用 user?.uid 去查詢wallets的原因是因為，uid對應的是當前登入的使用者識別，每個不同的使用者對應不同的uid，
  // 而抓出的wallets的uid就是當前登入的使用者的uid，所以才能抓出這個使用者的所有錢包
  // 多欄位查詢的時候會遇到index有關的error訊息，這部分可以透過firebase提供的link來解決，詳細筆記有備注在readme
  // The query requires an index 開頭的那篇
  const {
    data: wallets,
    loading,
    error,
  } = useFetchData<WalletType>("wallets", [
    where("uid", "==", user?.uid),
    orderBy("created", "desc"),
  ]);

  console.log("loading==>", loading);

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
          {loading && <Loading />}
          <FlatList
            data={wallets}
            renderItem={({ item, index }) => {
              return (
                <WalletListItem item={item} index={index} router={router} />
              );
            }}
          />
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
