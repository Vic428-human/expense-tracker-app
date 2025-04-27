
import { initializeApp, getApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// getReactNativePersistence 會有 type issue https://stackoverflow.com/questions/76914913/cannot-import-getreactnativepersistence-in-firebase10-1-0
// https://stackoverflow.com/questions/77048569/issue-with-initializing-firebase-auth-for-react-native-using-asyncstorage
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';

// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'; // 不確定 ReactNativeAsyncStorage and AsyncStorage 區別在哪
// https://blog.csdn.net/qq_20825669/article/details/127468560
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getFirestore, collection, query, where } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//  让你可以灵活配置 Firebase 认证服务的依赖和行为，优化包体积、性能与平台兼容性，适合对性能、平台适配有更高要求的应用场景。对于大多数常规 Web 应用
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// https://firebase.google.com/docs/firestore/quickstart?hl=zh-cn
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);




// 示例：从 Firestore 查询数据 https://blog.csdn.net/zhangyunchou2015/article/details/147111834
// const usersRef = collection(db, 'users');
// const q = query(usersRef, where('age', '>', 18));

export { auth, db };
