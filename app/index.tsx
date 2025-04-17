import { StyleSheet, Text, View, Image } from 'react-native'
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react'
import { colors } from '@/constants/theme'


const index = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/(auth)/welcome");
    }, 2000); // 2秒後跳轉

    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        style={styles.logo}
        source={require('../assets/images/splashImage.png')}
      />
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutral900
  },
  logo: {
    height: '20%',
    aspectRatio: 1, // 確保圖片寬高都是1:1,不會因為設備不同而變形
  }
})