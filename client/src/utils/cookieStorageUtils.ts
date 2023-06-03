import Cookies from "js-cookie";
import { decryptData, encryptData } from "./encryption";

export const saveUserIdToCookie = (userId: string) => {
  try {
    const encryptedUserId = encryptData(userId); // encrypt the user ID before saving it
    Cookies.set("user_id", encryptedUserId, { expires: 7 }); // set the cookie to expire in 7 days
  } catch (error) {
    console.error("Error saving user ID to sessionStorage: ", error);
  }
};

export const getDecryptedUserIdFromCookie = () => {
  const encryptedUserId = Cookies.get("user_id");
  if (encryptedUserId) {
    const decryptedUserId = decryptData(encryptedUserId); // decrypt the user ID before returning it
    return decryptedUserId;
  }
  return null;
};
