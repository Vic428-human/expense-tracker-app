import { AuthContextType, UserType } from "@/types";
import { createContext, useState, useContext, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
// https://dev.to/imkrunalkanojiya/firebase-v9-firestore-adddoc-and-setdoc-method-examples-nhe
import { auth, db } from "@/config/firebase";
import { setDoc, getDoc, doc } from "firebase/firestore";
import { useRouter } from "expo-router";

const AuthContext = createContext<AuthContextType | null>(null);

// 原先
type Props = {
  children: React.ReactNode;
};

// 修改後=> 這邊其實沒用到，預先寫而已，為了之後 type 除了有children 之外的屬性
interface MyProps {
  title: string;
}

type PropsWithChildren<P = unknown> = P & {
  children?: React.ReactNode | undefined;
};

// 等价于
// type MyComponentProps = { title: string; children?: React.ReactNode | undefined }
type MyComponentProps = PropsWithChildren<MyProps>;

// 問題：
// Type '({ children }: Props) => void' is not assignable to type 'FC<Props>'.
// Type 'void' is not assignable to type 'ReactNode'.
// https://stackoverflow.com/questions/71788254/react-18-typescript-children-fc
export const AuthProvider: React.FC<MyComponentProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("!! user===>", user);
        setUser({
          uid: user.uid,
          email: user.email,
          name: user.displayName,
        });
        router.replace("/(tabs)"); // 登入後
      } else {
        setUser(null);
        router.replace("/(auth)/welcome"); // 登入前
      }
    });
    return () => unsubscribe;
  }, []);

  async function login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // const user = userCredential.user;

      return { success: true };
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      return { success: true, msg: errorMessage };
    }
  }

  async function register(email: string, name: string, password: string) {
    try {
      // https://github.com/firebase/firebase-js-sdk/discussions/8064
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // 參考：Georgy Martynovich
      // https://stackoverflow.com/questions/48740430/firestore-how-to-get-document-id-after-adding-a-document-to-a-collection
      // Add a new document in collection "user"
      await setDoc(doc(db, "users", response?.user?.uid), {
        name,
        email,
        uid: response?.user?.uid,
      });

      return { success: true }; // 對應的是 AuthContextType 是先定義好的規範
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      return { success: true, msg: errorMessage };
    }
  }

  async function updateUserDate(userId: string) {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        // 拿某一筆舊的User資料
        const userData: UserType = {
          uid: data.uid,
          email: data.email || null,
          name: data.name,
          image: data.image || null,
        };
        setUser({ ...userData }); // https://github.com/firebase/firebase-js-sdk/issues/5987
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  const contextAuth: AuthContextType = {
    user,
    setUser,
    login,
    register,
    updateUserDate,
  };

  return (
    <AuthContext.Provider value={contextAuth}>{children}</AuthContext.Provider>
  );
};

// 封装自定义 Hook 统一处理校验
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("必须在 AuthProvider 内使用  context");
  }
  return context;
};
