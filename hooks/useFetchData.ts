import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

// T 代表一个“类型参数”，就像函数参数一样，但它用于类型。这样写的目的是让你的函数、接口或组件在定义时不预先指定具体的数据类型，而是在使用时再指定类型，从而增强代码的灵活性和复用性
// 由於 useFetchData 回傳的data 不一定會是哪一種類型，為了保持彈性，我們通常會在 () 前面加上 <T> 這樣可以彈性根據實際回傳數據的類型去對應
const useFetchData = <T>(collectionName:string) => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


  return (
   { data, loading, error}
  )
}

export default useFetchData

const styles = StyleSheet.create({})