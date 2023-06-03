import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = "my-secret-key";

export const encryptData = (data: any): string => {
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    ENCRYPTION_KEY
  ).toString();
  return ciphertext;
};

export const decryptData = (ciphertext: string): any => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};
