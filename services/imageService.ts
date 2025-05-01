export const getProfileImage = (image: any) => {

    if (image && typeof image == "string") return image;   
    // 從本地上傳圖片的時候會是物件
    if (image && typeof image == "object") return image.uri;

    if (!image) return require("../assets/images/defaultAvatar.png");;
};