import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, query, onSnapshot, getDocs, QueryConstraint } from "firebase/firestore";
import { db } from '@/config/firebase';

// T 代表一个“类型参数”，就像函数参数一样，但它用于类型。这样写的目的是让你的函数、接口或组件在定义时不预先指定具体的数据类型，而是在使用时再指定类型，从而增强代码的灵活性和复用性
// 由於 useFetchData 回傳的data 不一定會是哪一種類型，為了保持彈性，我們通常會在 () 前面加上 <T> 這樣可以彈性根據實際回傳數據的類型去對應
// QueryConstraint 類型定義用法 => https://modularfirebase.web.app/reference/firestore_lite.query
const useFetchData = <T>(collectionName:string, contraints: QueryConstraint[]) => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string|null>(null);

    useEffect(()=>{
        if(!collectionName) return;
        const collectionRef = collection(db, collectionName); // 會指向資料庫中的某個位置。無論資料是否存在，您都可以建立參照
        // 可以使用 where() 查詢符合特定條件的所有文件 where 其實就是 QueryConstraint 的其中一種。 https://firebase.google.com/docs/firestore/query-data/get-data?hl=zh-tw
        // ex: const q = query(collectionRef, where("capital", "==", true));
        const q = query(collectionRef, ...contraints);

        // 標題： 處理監聽錯誤 => https://firebase.google.com/docs/firestore/query-data/listen?hl=zh-tw
        const unsubscribe = onSnapshot(q, (snapshot) => {
            // Respond to data
            const fetchData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as T[];
            console.log("Current data: ", );
            setData(fetchData);
            setLoading(false);
        },(error) => {
            console.log('Error getting documents: ', error);
            setError(error.message)
            setLoading(false);
        });

        // Later ...

        // Stop listening to changes => https://firebase.google.com/docs/firestore/query-data/listen?hl=zh-tw
        return () => unsubscribe();
    })

    return (
        { data, loading, error}
    )
}

export default useFetchData

const styles = StyleSheet.create({})