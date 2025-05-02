import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ModalWrapper from "@/components/ModalWrapper";
import Typo from "@/components/Typo";
import { colors } from "@/constants/theme";

const walletModal = () => {
  return (
    <ModalWrapper style={styles.wrapper}>
      <Typo>walletModal</Typo>
    </ModalWrapper>
  );
};

export default walletModal;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.neutral900,
  },
});
