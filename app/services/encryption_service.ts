import CryptoJS from 'crypto-js';
import env from "#start/env";

export default class EncryptionService {

  private secretKey = env.get('ENCRYPT_KEY');

  encryptDataObject(data: any): string {
    if (this.secretKey) {
      data = JSON.stringify(data);
      return CryptoJS.AES.encrypt(data, this.secretKey).toString();
    }
    return "";
  }

  encryptData(data: string | number): string {
    const dataToEncrypt = typeof data === "number" ? data.toString() : data;
    if (this.secretKey)
      return this.encryptSalesforceData(CryptoJS.AES.encrypt(dataToEncrypt, this.secretKey).toString());
    return "";
  }

  encryptSalesforceData(data: string): string {
    return data.replace(/\//g, '___');
  }

  replaceSalesforceData(data: string): string{
    return data.replace(/___/g, '/');
  }

  decryptData(data: string): string {
    if (data && this.secretKey) {
      const bytes = CryptoJS.AES.decrypt(data, this.secretKey);
      return bytes.toString(CryptoJS.enc.Utf8);
    }
    return "";
  }
}