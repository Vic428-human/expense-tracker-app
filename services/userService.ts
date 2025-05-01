import { db } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ResponseType, UserDataType } from "@/types";

// 先刷新firebase上的資料
export const updateUser = async (uid: string, updatedData: UserDataType): Promise<ResponseType> => {
    try {
      const docRef = doc(db, "users", uid);
      // https://stackoverflow.com/questions/72863617/how-do-i-write-to-firebase-firestore-from-react-native/72863834
      await updateDoc(docRef, updatedData)
      return { success: true , msg: 'user updated successfully' }
    } catch (error: any)  {
        console.log('error updating user0', error)
        return {
            success: false,
            msg: error.message
        }
      }
    }
