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

# 這個有比較大嗎？

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

### Profile Avatar 頭像切版

```
styles.editIcon
```

用途:

1. 編輯頭像的切版

### Profile Avatar 圖片上傳核心邏輯

```
services/imageService.ts
services/userService.ts
```

1. services/imageService.ts => uploadFileToCloudinary Func => 將本地端的圖片，傳到 cloudinary 的邏輯
2. services/userService.ts => updateUser Func => 會將先前 cloudinary 回傳的 secure_url 跟 前端更改的 name 文字一併上傳到 firebase 做更新

### wallet 圖片上傳的 切版

```
styles.inputContainer
styles.image
styles.deleteIcon
```

1. 上傳前空的切版圖
2. 上傳後有圖片的切版圖
3. 上傳後右上方可供刪除的圖
