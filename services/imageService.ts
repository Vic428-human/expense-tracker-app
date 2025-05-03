
// You can upload an image on your own Cloudinary product environment by replacing the CLOUD_NAME, FILE, TIMESTAMP, API_KEY, and SIGNATURE in the cURL command below:
// curl https://api.cloudinary.com/v1_1/<CLOUD_NAME>/image/upload -X POST --data 'file=<FILE>&timestamp=<TIMESTAMP>&api_key=<API_KEY>&signature=<SIGNATURE>'
// CLOUD_NAME => API Keys Cloud name https://console.cloudinary.com/app/c-aba13a8b8216b87e89a18a944fa023/settings/upload/presets
// https://cloudinary.com/documentation/image_upload_api_reference

import { CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/constants";
import axios  from "axios";
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

// upload file to cloudinary for async arrow func
export const uploadFileToCloudinary = async (file: { uri?: string} | string, folderName:  string): Promise<any> => {
 // https://stackoverflow.com/questions/76859469/how-to-append-local-images-to-formdata-from-expo-v48-onwards
    try{
        if(!file) return {success: false, data: null }

        if(typeof file == "string") {
            return {success: true, data: file}
        }
        if(file && file.uri){
            // How can I upload image with form data?
            // { uri, type, name } 這種寫法通常出現在 React Native（不是標準瀏覽器環境），在標準 HTML 環境下直接 append File 物件即可
            // Ferin Patel => https://stackoverflow.com/questions/61905573/how-can-i-upload-image-with-form-data
            let formData = new FormData();  

            formData.append('file', {  // 會新增一個 key 為 file 的檔案資料（這裡是物件，通常應該是一個 File 或 Blob 物件）
                uri: file?.uri,
                type: 'image/jpeg',
                name: file?.uri?.split("/").pop() || "file.jpg", // 先用 / 分割整個字串，得到一個陣列，再取最後一個元素 ex: E70D0AA4-C9EF-4BA4-8B76-F3F5072AB78A.jpg
            } as any);

            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)  // 會新增一個 key 為 upload_preset 的字串資料。 upload_preset 是 Cloudinary API 的必要參數之一，用來指定預設的上傳行為
            formData.append('folder', folderName )  // 會新增一個 key 為 cloud_name 的字串資料。 cloud_name 是 Cloudinary API 的必要參數之一，用來指定 Cloudinary 域名
            
            let axiosConfig = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Access-Control-Allow-Origin": "*",
                }
              };
            
            // https://stackoverflow.com/questions/44617825/passing-headers-with-axios-post-request
            let response = await axios.post(CLOUDINARY_URL, formData, axiosConfig)
            console.log('成功把本地端圖片上傳到 cloudinary 並回傳帶有 secure_url 的物件==>', response)
            // The Cloudinary response has a secure_url, which we attach to the links.
            return {success: true, data: response?.data?.secure_url} 
            
           
        }

    }catch(error:any){
        return {success: false, msg: error.message || 'Could not upload image'}
    }
   
   
    

};

export const getProfileImage = (image: any) => {

    if (image && typeof image == "string") return image;   
    // 從本地上傳圖片的時候會是物件  ex: image => { "assetId":  ,"type": "image", "uri": "file:/ }
    if (image && typeof image == "object") return image.uri;
    
    if (!image) return require("../assets/images/defaultAvatar.png");;
};


export const getFilePath = (image: any) => {

    if (image && typeof image == "string") return image;   
    // 從本地上傳圖片的時候會是物件  ex: image => { "assetId":  ,"type": "image", "uri": "file:/ }
    if (image && typeof image == "object") return image.uri;
    
    return null; // 錢包上傳圖片前是沒有圖片的
};


// 在網頁上的情況類似這樣 參考用 
// <form enctype="multipart/form-data"> 是必須的，這樣瀏覽器才會用正確的格式夾帶檔案資料
//     <input type="file" name="file" /> 這個欄位讓使用者從本地裝置選擇一個檔案，並且在表單送出時會以 file 為欄位名稱傳送到伺服器
//     <button type="submit">Upload</button>
// </form>

// const fileInput = document.querySelector('input[type="file"]');
// const file = fileInput.files[0]; // File 物件 { uri, type, name }
// formData.append('file', file);
