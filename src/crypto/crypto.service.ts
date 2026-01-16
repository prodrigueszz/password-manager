import { scrypt, randomBytes, createCipheriv, createDecipheriv, CipherCCM, DecipherCCM } from "crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);
const randomBytesAsync = promisify(randomBytes)

export type EncryptedData = {
  ciphertext: string;
  iv: string;
  authTag: string;
}

export class CryptoService {
  private static ALGORITH = 'aes-256-gcm';

  private static async deriveKey (masterPassword: string, salt: string): Promise<Buffer> {
    return (await scryptAsync(masterPassword, salt, 32)) as Buffer;
  }

  public static async encrypt(
    passwordToEncrypt: string,
    masterPassword: string,
    salt: string
  ): Promise<EncryptedData> {
    const key = await this.deriveKey(masterPassword, salt);
    const iv = await randomBytesAsync(12);
    const cipher = createCipheriv(this.ALGORITH, key, iv) as CipherCCM;

    let encrypted = cipher.update(passwordToEncrypt, 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag().toString('hex');

    return {
      ciphertext: encrypted,
      iv: iv.toString('hex'),
      authTag: authTag
    };
  }

  public static async decrypt(
    data: EncryptedData,
    masterPassword: string,
    salt: string
  ): Promise<string> {
    const key = await this.deriveKey(masterPassword, salt);

    const ivBuffer = Buffer.from(data.iv, 'hex');
    const authTagBuffer = Buffer.from(data.authTag, 'hex');

    const decipher = createDecipheriv(this.ALGORITH, key, ivBuffer) as DecipherCCM;

    decipher.setAuthTag(authTagBuffer);

    try {
      let decrypted = decipher.update(data.ciphertext, 'hex', 'utf-8');
      decrypted += decipher.final('utf-8');

      return decrypted;
    } catch (error) {
      throw new Error('Falha na descriptografia');
    }
  }
}
