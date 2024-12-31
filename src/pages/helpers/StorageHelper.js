import { decrypt, encrypt } from "./encryptionHelper";

export function setLocalStorageData(key, data) {
  let encryptData = encrypt(data);
  localStorage.setItem(key, encryptData);
}

export function getLocalStoragedata(key) {
  let data = localStorage.getItem(key);

  try {
    // First, try to parse it as JSON (for non-encrypted data)
    return JSON.parse(data);
  } catch (e) {
    // If parsing fails, assume it's encrypted and try to decrypt
    try {
      const decryptedData = decrypt(data);
      return JSON.parse(decryptedData);
    } catch (decryptError) {
      console.error('Error decrypting data:', decryptError);
      return null;
    }
  }
};
