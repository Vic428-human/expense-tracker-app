import { db } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ResponseType, UserDataType } from "@/types";
import { uploadFileToCloudinary } from "./imageService";

//  updateDoc => 先刷新 firebase 上的資料
//  uploadFileToCloudinary => 上傳圖片到 Cloudinary 後 會回傳  secure_url 的 link，之後再把這個image link 連同 name 傳到 firebase 做更新
//  updatedData 包含了前端 name 跟 image 的變更內容
export const updateUser = async (uid: string, updatedData: UserDataType): Promise<ResponseType> => {
    try {
      const docRef = doc(db, "users", uid);
     
      // 如果 updatedData 的 image 存在
      // 那就更新 image: {"assets": [{}], "type": "image", "uri": 'xx' }
      if(updatedData?.image && updatedData?.image?.uri) {
        const response = await uploadFileToCloudinary(updatedData.image, 'users')
        // faild to upload image to cloudinary
        if(!response.success) return { success: false, msg: response.msg || "faild to upload image" }
        updatedData.image = response.data // The Cloudinary response has a secure_url, which we attach to the links.
      }

      // https://stackoverflow.com/questions/72863617/how-do-i-write-to-firebase-firestore-from-react-native/72863834
      await updateDoc(docRef, updatedData) // 把前端更新的內容傳到firebase上

      return { success: true , msg: 'user updated successfully' }
    } catch (error: any)  {
        console.log('error updating user', error)
        return {
            success: false,
            msg: error.message
        }
      }
    }
