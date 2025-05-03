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

## CodeBase 架構說明

### RWD 根據 IOS 或 Android 等比例縮放的配置

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

### 路由/Modal 切換的架構差異

```
app/(modals) // 登入後

import { Stack } from "expo-router";

// 以 presentation modal 形式 彈窗的路由，這是在登入後用的 範本如下：
<Stack.Screen
   // https://stackoverflow.com/questions/76108450/presenting-modal-on-tabs-using-react-native-and-expo-router
   name="(modals)/profileModal" // add a routeName with name='your-modal'
   options={{
   presentation: "modal",
   }}
/>

```

1. 彈窗相關的路由

```
app/(auth) // welcome 是 登入前的路由，register跟login則是welcome page裡面可以切換的路由
```

1. 跟登入前後有關的路由

```
import { Tabs, useSegments } from "expo-router";

app/(tabs)/_layout.tsx  // tabs 路由，登入後可以進入的

app/(tabs)/profile.tsx // 在同樣 tabs 路徑底下，可以根據 _layout.tsx裡面  expo-router 的 Tabs 去切換當前對應的tab
```

1. 跟 tabs 切換有關的路由

### 錢包與使用者 uid 與 id 的區別 (firebase)

```
    const data: WalletType = {
      uid: user?.uid as string,
      name,
      image,
      uid: "",
      amount: 0,
      totalIncome: 0,
      totalExpense: 0,
    };
    // TODO: include wallet id if updating
    setLoading(true);
    const response = await createdOrUpdateWallet(data);

```

![firebase users collections](https://github.com/Vic428-human/expense-tracker-app/blob/4ca4fced063cf7bb796e490f67724a596b5a43a6/assets/ReadmeImage/usersFirebase.jpg).
![firebase wallets collections](https://github.com/Vic428-human/expense-tracker-app/blob/4ca4fced063cf7bb796e490f67724a596b5a43a6/assets/ReadmeImage/usersFirebase.jpg).

1.users 都有其對應的使用者，例如使用者小明，假設對應的 uid 是 oEe 開頭那個，而這個使用者旗下會有好幾個不同 id 的錢包，從 wallets collection 可以看出來目前有三個，7QE,7Rl..這些，從他的新增欄位可以看到，
它所指向的 uid 是 oEe，這說明這些錢包都是 oEe (小明的)，所以解釋了為什麼需要在 WalletType 定義 uid，因為需要區分是哪一個使用者，而 id 則是區分不同錢包的唯一識別。
