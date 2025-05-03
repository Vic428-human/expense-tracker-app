import { ResponseType, WalletType } from "@/types";
import { uploadFileToCloudinary } from "./imageService";
import { db } from "@/config/firebase";
import { addDoc, collection, CollectionReference, doc, DocumentData, DocumentReference, setDoc, updateDoc } from "firebase/firestore";
// Partial => https://ithelp.ithome.com.tw/m/articles/10273198
export const createdOrUpdateWallet = async (walletData: Partial<WalletType>):  Promise<ResponseType> => {
   try {
    let walletToSave = {...walletData};  

    if(walletData?.image) {
      const walletUploadRes = await uploadFileToCloudinary(walletData.image, 'wallets')
      // faild to upload image to cloudinary
      if(!walletUploadRes.success) return { success: false, msg: walletUploadRes.msg || "faild to upload image" }
      walletToSave.image = walletUploadRes.data // The Cloudinary response has a secure_url, which we attach to the links.
    }

    // id 不存在代表 wallet還沒被創建
    if(!walletData?.id){
      walletToSave.amount = 0;
      walletToSave.totalIncome = 0;
      walletToSave.totalExpense = 0 ;
      walletToSave.created = new Date();
      // 用 addDoc 讓 Firestore 自動產生 id
      const walletRef = await addDoc(collection(db, "wallets"), walletToSave);
      // TODO: 不確定放與不放會不會有實質上的區別，先備注 id: walletRef.id 
      return { success: true, data: { ...walletToSave} };
    }

    // https://firebase.google.com/docs/firestore/query-data/queries?hl=zh-tw
    // Create a reference to the wallets collection
    // const walletsRef = collection(db, "wallets");


    const walletRef = doc(db, "wallets", walletData.id);
    
    // 如要建立或覆寫單一文件，請使用下列特定語言的 set() 方法
    // Add a new document in collection "wallets"

    // TODO:
    //  Argument of type 'DocumentReference | CollectionReference' is not assignable to parameter of type 'DocumentReference'.
    //  這是因為 setDoc 只能接受 DocumentReference，不能接受 CollectionReference。但你的寫法：
    // as DocumentReference<DocumentData>
    await setDoc(walletRef , walletToSave, { merge: true }); // merge => 系統會將其內容覆寫為新提供的資料
  
    return { success: true, data:{...walletToSave, id: walletRef.id} }
   } catch (error: any)  {
    console.log('error creating wallet', error)
    return {
        success: false,
        msg: error.message
    }
  }
};