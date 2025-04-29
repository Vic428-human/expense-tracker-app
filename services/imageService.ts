export const getProfileImage = (image: any) => {

    if (!image) return require("../assets/images/defaultAvatar.png");;

    if (image && typeof image !== "string") return "";   

    if (image && typeof image === "object") return image.uri;

    
};