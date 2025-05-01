## Get started

0. node version

   ```bash
   node -v
   v 18
   ```

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)

## CodeBase 說明

tils/styling.ts 引用的是 react-native-size-matters 裡的作法的改寫
[react-native-size-matters](https://www.npmjs.com/package/react-native-size-matters).
用途：

1. 多裝置螢幕適配困難 (手機版 RWD)
2. 統一的縮放策略(包含：間距/圓邊/水平跟垂直模式)

components/CustomTabs.tsx 引用的是
[tabBar > Static](https://reactnavigation.org/docs/bottom-tab-navigator/).
用途：

1. 客製化 tabs，官方已經有一套用法，根據它的基礎添加 Icons 上去

```
styles.editIcon
```

用途:

1. 編輯頭像的切版
