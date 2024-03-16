import decrypt from "./decrypt";
import encrypt from "./encrypt";
import getSession from "./getSession";
import validateUser from "./validateUser";

export type CookiePayload = {
  expires: Date;
  [key: string]: any;
};

// When the cookie expires, default to 300 seconds
export const cookieExpiresIn = 300 * 1000;

// Creating a key from the JWT secret
const key = new TextEncoder().encode(process.env.JWT_SECRET!);

// Making the key value accessible to encrypt and decrypt function
export const encryptSession = (payload: CookiePayload) => encrypt(payload, key);

export const decryptSession = <T>(cookieValue: string) =>
  <T>decrypt(cookieValue, key);

// Exporting the authentication functions
export { getSession, validateUser };
